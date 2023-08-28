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
import { v4 as uuidv4 } from 'uuid';

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

  async validate(email: string, password: string): Promise<user> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      throw new MyException({
        status_code: HttpStatus.UNAUTHORIZED,
        message: 'Lỗi xác thực người dùng',
        errors: {
          email: 'không tồn tại',
        },
      });
    }
    if (!(await this.comparePassword(password, user.password))) {
      throw new MyException({
        status_code: HttpStatus.UNAUTHORIZED,
        message: 'Lỗi xác thực người dùng',
        errors: {
          password: 'không đúng',
        },
      });
    }
    if (!user.isActive) {
      throw new MyException({
        status_code: HttpStatus.UNAUTHORIZED,
        message: 'Lỗi xác thực người dùng',
        errors: {
          block: 'Tài khoản của bạn đã bị khóa',
        },
      });
    }
    return user;
  }

  async createAccessToken(user: UserWithLocal): Promise<string> {
    return (
      'Bearer ' +
      (await this.jwtService.signAsync(user, {
        expiresIn: 1000 * 60 * 60 * 8,
      }))
    );
  }

  async createRefreshToken(user: UserWithLocal): Promise<string> {
    return (
      'Bearer ' +
      (await this.jwtService.signAsync(user, {
        expiresIn: 1000 * 60 * 60 * 24 * 7,
        secret: process.env.SECRET_REFRESH_TOKEN,
      }))
    );
  }

  async login(
    user: UserWithLocal,
    response: ResponseExpress,
  ): Promise<SuccessResponse<{ accessToken: string }>> {
    const access_token = await this.createAccessToken(user);
    const refresh_token = await this.createRefreshToken(user);
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
      message: 'Chào mừng bạn đến với Van Loc Store',
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
          user_id: uuidv4(),
          email,
          name,
          avatar,
        },
      });
      return {
        message: 'Chào mừng bạn đến với Van Loc Store',
        data: {
          accessToken: await this.createAccessToken({ role, user_id }),
        },
      };
    }
    return {
      message: 'Chào mừng bạn đến với Van Loc Store',
      data: {
        accessToken: await this.createAccessToken({
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
        message: 'Đăng kí thất bại',
        errors: {
          email: 'Email đã tồn tại',
        },
      });
    }
    const accessToken = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          user_id: uuidv4(),
          email,
          password: await this.hashPassword(password),
          name,
          avatar:
            'https://cdn.divineshop.vn/image/catalog/icon/avatar-khach-hang-2-52544.png?hash=1649933269',
        },
      });
      const payload = {
        role: user.role,
        user_id: user.user_id,
      } as UserWithLocal;
      const access_token = await this.createAccessToken(payload);
      const refresh_token = await this.createRefreshToken(payload);
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
        subject: 'Chào mừng bạn đến với Van Loc Store',
        html: '<p>Chúc mừng bạn đăng kí tài khoản thành công! Xin chào ' + name,
      },
      { removeOnComplete: true },
    );
    return {
      message: 'Đăng kí thành công',
      data: {
        accessToken,
      },
    };
  }

  async forgotPassword(email: string): Promise<SuccessResponse<{}>> {
    const idExist = await this.cacheManager.get(email);
    if (idExist) {
      return {
        message: 'Chỉ được phép gửi code sau 20s',
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
        message: 'Thay đổi mật khẩu thất bại',
        errors: {
          email: 'Email không tồn tại',
        },
      });
    }
    try {
      const code = user.user_id + '%' + Math.random().toString(36).slice(2, 7);
      const url = `http://${process.env.HOST_STORE}:3000/password/reset/${code}`;
      await this.emailQueue.add(
        'forgot-password',
        {
          email: email,
          code: code,
          user_id: String(user.user_id),
          email_infor: {
            to: email,
            subject: 'Reset your password',
            html: `<p>Truy cập vào <a href="${url}" style="color: red;">đây</a> để thay đổi password của bạn!</p>`,
          },
        },
        {
          removeOnComplete: true,
        },
      );
      return {
        message: 'Đã gửi code',
        data: {},
      };
    } catch (error) {
      await this.cacheManager.del(email);
      await this.cacheManager.del(String(user.user_id));
      throw new MyException({
        status_code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Có lỗi trong quá trình gửi mail đến bạn!',
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
        message: 'Thay đổi mật khẩu thất bại',
        errors: {
          new_password: 'không được giống với mật khẩu hiện tại',
        },
      });
    }
    const [user_id, _] = code.split('%');
    const valueInCache = await this.cacheManager.get(user_id);
    if (!valueInCache) {
      throw new MyException({
        status_code: HttpStatus.NOT_FOUND,
        message: 'Thay đổi mật khẩu không thành công do thời gian đã hết hạn',
      });
    }
    const user = await this.prisma.user.findFirst({
      where: {
        user_id,
      },
    });
    if (!user) {
      throw new MyException({
        status_code: HttpStatus.NOT_FOUND,
        message: 'Người dùng không tồn tại',
      });
    }
    const isSame = await this.comparePassword(currentPassword, user.password);
    if (!isSame) {
      throw new MyException({
        status_code: HttpStatus.BAD_REQUEST,
        message: 'Thay đổi mật khẩu thất bại',
        errors: {
          current_password: 'Không đúng',
        },
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
      message: 'Thay đổi mật khẩu thành công',
      data: {},
    };
  }

  async logout(
    user_id: string,
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
      message: 'Đăng xuất thành công',
      data: {},
    };
  }

  async renewToken(
    access_token: string,
    refresh_token: string,
    response: ResponseExpress,
  ): Promise<SuccessResponse<{ accessToken: string }>> {
    const isAccessTokenExist = await this.jwtService.verify(access_token, {
      secret: process.env.SECRET_ACCESS_TOKEN,
    });
    if (isAccessTokenExist) {
      throw new MyException({
        status_code: HttpStatus.BAD_REQUEST,
        message: 'Làm mới refresh token không thành công',
        errors: {
          accessToken: 'Access token vẫn còn hiệu lực',
        },
      });
    }
    if (!refresh_token) {
      throw new MyException({
        status_code: HttpStatus.BAD_REQUEST,
        message: 'Làm mới refresh token không thành công',
        errors: {
          refreshToken: 'Refresh token không tồn tại',
        },
      });
    }
    const session = await this.prisma.session.findFirst({
      where: {
        refresh_token,
        access_token,
      },
    });
    if (!session) {
      throw new MyException({
        status_code: HttpStatus.NOT_FOUND,
        message: 'Làm mới refresh token không thành công',
        errors: {
          refreshToken: 'Không tìm thấy phiên đăng nhập có chứa refresh token',
        },
      });
    }
    const value: UserWithLocal = await this.jwtService.verify(refresh_token, {
      secret: process.env.SECRET_REFRESH_TOKEN,
    });
    if (!value) {
      throw new MyException({
        status_code: HttpStatus.BAD_REQUEST,
        message: 'Làm mới refresh token không thành công',
        errors: {
          refreshToken: 'Refresh token không đúng',
        },
      });
    }
    const new_access_token = await this.createAccessToken(value);
    const new_refresh_token = await this.createRefreshToken(value);
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
      message: 'Làm mới refresh token thành công',
      data: {
        accessToken: new_access_token,
      },
    };
  }

  async profilesCustomer() {
    const users = await this.prisma.user.findMany();
  }

  async profilesDetailCustomer(
    slug: string,
  ): Promise<SuccessResponse<Omit<user, 'password'>>> {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id: slug,
      },
    });
    if (!user) {
      throw new MyException({
        status_code: HttpStatus.NOT_FOUND,
        message: 'Người dùng không tồn tại',
      });
    }
    return {
      message: 'Lấy thông tin người dùng thất bại',
      data: omit(user, ['password']),
    };
  }

  async profile(
    user_id: string,
  ): Promise<
    SuccessResponse<Omit<user, 'password' | 'created' | 'updated' | 'isActive'>>
  > {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id,
      },
    });
    if (!user) {
      throw new MyException({
        status_code: HttpStatus.NOT_FOUND,
        message: 'Lấy thông tin cá nhân thất bại',
        errors: {
          user_id: 'Không tồn tại',
        },
      });
    }
    return {
      message: 'Lấy thông tin cá nhân thành công',
      data: omit(user, ['password', 'created', 'updated', 'isActive']),
    };
  }

  async update_profile(
    user_id: string,
    { email, name }: Partial<Pick<user, 'email' | 'name'>>,
    file_name?: string,
  ): Promise<
    SuccessResponse<Omit<user, 'password' | 'created' | 'updated' | 'isActive'>>
  > {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id,
      },
    });
    if (!user) {
      throw new MyException({
        status_code: HttpStatus.NOT_FOUND,
        message: 'Người dùng không tồn tại',
      });
    }
    const updated = await this.prisma.user.update({
      where: {
        user_id,
      },
      data: {
        email,
        name,
        avatar: file_name ? file_name : undefined,
      },
    });
    return {
      message: 'Cập nhật thông tin thành công',
      data: omit(updated, ['password', 'created', 'updated', 'isActive']),
    };
  }

  async changePassword(
    user_id: string,
    current_password: string,
    new_password: string,
  ): Promise<SuccessResponse<{}>> {
    if (current_password === new_password) {
      throw new MyException({
        status_code: HttpStatus.BAD_REQUEST,
        message: 'Mật khẩu mới và mật khẩu cũ phải khác nhau',
      });
    }
    const user = await this.prisma.user.findUnique({
      where: {
        user_id,
      },
    });
    if (!user) {
      throw new MyException({
        status_code: HttpStatus.NOT_FOUND,
        message: 'Người dùng không tồn tại',
      });
    }
    if (!(await this.comparePassword(current_password, user.password))) {
      throw new MyException({
        status_code: HttpStatus.BAD_REQUEST,
        message: 'Thay đổi password thất bại',
        errors: {
          current_password: 'mật khẩu hiện tại không đúng',
        },
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
      message: 'Thay đổi password thành công',
      data: {},
    };
  }
}
