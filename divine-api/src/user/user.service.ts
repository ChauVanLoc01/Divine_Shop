import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { user } from '@prisma/client';
import { UserWithLocal } from '../types/ReqWithLocal.type';
import { UserWithGoogle } from '../types/ReqWithGoogle.type';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Response } from '../types/Response.type';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
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
      return 'Your account was blocked';
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

  async login(user: UserWithLocal): Promise<Response<{ accessToken: string }>> {
    return {
      message: 'Wellcome to My Store',
      data: {
        accessToken: this.createAccessToken(user),
      },
    };
  }

  async loginByGoogle(
    user: UserWithGoogle,
  ): Promise<Response<{ accessToken: string }>> {
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
  ): Promise<Response<{ accessToken: string }>> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    const hash = await this.hashPassword(password);
    const { role, user_id } = await this.prisma.user.create({
      data: {
        email,
        password: hash,
      },
    });
    return {
      message: 'Register successfull',
      data: {
        accessToken: this.createAccessToken({ role, user_id }),
      },
    };
  }
}
