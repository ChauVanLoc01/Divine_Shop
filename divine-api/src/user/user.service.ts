import { Injectable, HttpStatus, Inject } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { user } from '@prisma/client';
import { UserWithLocal } from '../types/ReqWithLocal.type';
import { UserWithGoogle } from '../types/ReqWithGoogle.type';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager/dist';
import { Cache } from 'cache-manager';
import { Response as ResponseExpress } from 'express';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { omit } from 'lodash';
import { SuccessResponse } from '../types/Response.type';
import { MyException } from '../commons/filters/my.filter';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectQueue('email') private emailQueue: Queue,
  ) {}

  async hashPassword(password: string) {
    return await bcrypt.hash(password, Number(process.env.STORE_SALT));
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async validate(email: string, password: string): Promise<user | string> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return 'Email incorrect';
    }
    if (!(await this.comparePassword(password, user.password))) {
      return 'Password incorrect';
    }
    if (!user.isActive) {
      return 'Your account is blocked';
    }
    return user;
  }

  createAccessToken(user: UserWithLocal): string {
    return (
      'Beaer ' +
      this.jwtService.sign(user, {
        expiresIn: process.env.TTL_ACCESS_TOKEN,
      })
    );
  }

  createRefreshToken(user: UserWithLocal): string {
    return (
      'Beaer ' +
      this.jwtService.sign(user, {
        expiresIn: process.env.TTL_REFRESH_TOKEN,
        secret: process.env.SECRET_REFRESH_TOKEN,
      })
    );
  }

  async login(
    user: UserWithLocal,
    response: ResponseExpress,
  ): Promise<SuccessResponse<{ accessToken: string }>> {
    const access_token = this.createAccessToken(user);
    const refresh_token = this.createRefreshToken(user);
    await this.prisma.session.create({
      data: {
        user_id: user.user_id,
        access_token,
        refresh_token,
      },
    });
    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return {
      message: 'Wellcome to Van Loc Store',
      data: {
        accessToken: access_token,
      },
    };
  }

  async loginByGoogle(
    user: UserWithGoogle,
  ): Promise<SuccessResponse<{ accessToken: string }>> {
    const { name, email, avatar } = user;
    const userDB = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!userDB) {
      const { role, user_id } = await this.prisma.user.create({
        data: {
          email,
          name,
          avatar,
        },
      });
      return {
        message: 'Well come to My Store',
        data: {
          accessToken: this.createAccessToken({ role, user_id }),
        },
      };
    }
    return {
      message: 'Well come to My Store',
      data: {
        accessToken: this.createAccessToken({
          role: userDB.role,
          user_id: userDB.user_id,
        }),
      },
    };
  }

  async register(
    email: string,
    password: string,
    name: string,
    response: ResponseExpress,
  ): Promise<SuccessResponse<{ accessToken: string }>> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      throw new MyException({
        status_code: HttpStatus.BAD_REQUEST,
        message: 'User is exist!',
      });
    }
    const accessToken = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: await this.hashPassword(password),
          name,
        },
      });
      const payload = {
        role: user.role,
        user_id: user.user_id,
      } as UserWithLocal;
      const access_token = this.createAccessToken(payload);
      const refresh_token = this.createRefreshToken(payload);
      await tx.session.create({
        data: {
          user_id: user.user_id,
          access_token,
          refresh_token,
        },
      });
      response.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      return access_token;
    });
    await this.emailQueue.add(
      'register',
      {
        to: email,
        subject: 'Welcome to My Store',
        html: '<p>Congratulation! Hello ' + name,
      },
      { removeOnComplete: true },
    );
    return {
      message: 'Register successfull',
      data: {
        accessToken,
      },
    };
  }

  async forgotPassword(email: string): Promise<SuccessResponse<{}>> {
    const idExist = await this.cacheManager.get(email);
    if (idExist) {
      return {
        message: 'Only sent code after 20s',
        data: {},
      };
    }
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      throw new MyException({
        status_code: HttpStatus.NOT_FOUND,
        message: 'Email is not exist!',
      });
    }
    try {
      const code = user.user_id + '%' + Math.random().toString(36).slice(2, 7);
      const url = `http://localhost:3000/${code}`;
      await this.emailQueue.add(
        'forgot-password',
        {
          email: email,
          code: code,
          user_id: String(user.user_id),
          email_infor: {
            to: email,
            subject: 'Reset your password',
            html: `<p>Click <a href="${url}" style="color: red;">here</a> to reset your password!</p>`,
          },
        },
        {
          removeOnComplete: true,
        },
      );
      return {
        message: 'Sent code',
        data: {},
      };
    } catch (error) {
      await this.cacheManager.del(email);
      await this.cacheManager.del(String(user.user_id));
      throw new MyException({
        status_code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Have some errors when send mail to you',
      });
    }
  }

  async resetPassword(
    code: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<SuccessResponse<{}>> {
    if (currentPassword === newPassword) {
      throw new MyException({
        status_code: HttpStatus.BAD_REQUEST,
        message: 'Both password must is different',
      });
    }
    const [user_id, _] = code.split('%');
    const valueInCache = await this.cacheManager.get(user_id);
    if (!valueInCache) {
      throw new MyException({
        status_code: HttpStatus.NOT_FOUND,
        message: 'Time to reset password expired',
      });
    }
    const user = await this.prisma.user.findFirst({
      where: {
        user_id: Number(user_id),
      },
    });
    if (!user) {
      throw new MyException({
        status_code: HttpStatus.NOT_FOUND,
        message: 'User is not exist',
      });
    }
    const isSame = await this.comparePassword(currentPassword, user.password);
    if (!isSame) {
      throw new MyException({
        status_code: HttpStatus.BAD_REQUEST,
        message: 'Current password is invalid',
      });
    }
    await this.prisma.user.update({
      where: {
        user_id: user.user_id,
      },
      data: {
        password: await this.hashPassword(newPassword),
      },
    });
    await this.cacheManager.del(user_id);
    return {
      message: 'Change password successfully',
      data: {},
    };
  }

  async logout(
    user_id: number,
    access_token: string,
    refresh_token: string,
  ): Promise<SuccessResponse<{}>> {
    await this.prisma.session.deleteMany({
      where: {
        user_id,
        refresh_token,
        access_token,
      },
    });
    return {
      message: 'Logout successfully',
      data: {},
    };
  }

  async renewToken(
    user_id: number,
    access_token: string,
    refresh_token: string,
    response: ResponseExpress,
  ): Promise<SuccessResponse<{ accessToken: string }>> {
    if (!refresh_token) {
      throw new MyException({
        status_code: HttpStatus.BAD_REQUEST,
        message: 'Refresh token is empty',
      });
    }
    const session = await this.prisma.session.findFirst({
      where: {
        user_id,
        refresh_token,
        access_token,
      },
    });
    if (!session) {
      throw new MyException({
        status_code: HttpStatus.NOT_FOUND,
        message: 'Refresh token does not found',
      });
    }
    const value: UserWithLocal = await this.jwtService.verify(refresh_token, {
      secret: process.env.SECRET_REFRESH_TOKEN,
    });
    if (!value) {
      throw new MyException({
        status_code: HttpStatus.BAD_REQUEST,
        message: 'Refresh token is expired',
      });
    }
    const new_access_token = this.createAccessToken(value);
    const new_refresh_token = this.createRefreshToken(value);
    await this.prisma.session.update({
      where: {
        session_id: session.session_id,
      },
      data: {
        access_token: new_access_token,
        refresh_token: new_refresh_token,
      },
    });
    response.cookie('refresh_token', new_refresh_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return {
      message: 'Refresh token successfully',
      data: {
        accessToken: new_access_token,
      },
    };
  }

  async profile(
    slug: number,
  ): Promise<SuccessResponse<Omit<user, 'password'>>> {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id: slug,
      },
    });
    if (!user) {
      throw new MyException({
        status_code: HttpStatus.NOT_FOUND,
        message: 'User is not exist',
      });
    }
    return {
      message: 'Get your profile successfully',
      data: omit(user, ['password']) as Omit<user, 'password'>,
    };
  }

  async changePassword(
    user_id: number,
    current_password: string,
    new_password: string,
  ): Promise<SuccessResponse<{}>> {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id,
      },
    });
    if (!user) {
      throw new MyException({
        status_code: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }
    if (!(await this.comparePassword(current_password, new_password))) {
      throw new MyException({
        status_code: HttpStatus.BAD_REQUEST,
        message: 'Current password is wrong',
      });
    }
    await this.prisma.user.update({
      where: {
        user_id,
      },
      data: {
        password: await this.hashPassword(new_password),
      },
    });
    return {
      message: 'Update password successfully',
      data: {},
    };
  }
}
