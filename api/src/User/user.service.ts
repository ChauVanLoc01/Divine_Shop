import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { user as UserModel } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserAfterAuthen } from 'src/Types/UserAfterAuthen.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    return await bcrypt.hash(password, process.env.STORE_SALT);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async validate(
    user_name: string,
    password: string,
  ): Promise<UserModel | string> {
    const user = await this.prisma.user.findFirst({
      where: {
        user_name,
      },
    });
    if (!user) {
      return 'User name incorrect';
    }
    if (!(await this.comparePassword(password, user.password))) {
      return 'Password incorrect';
    }
    return user;
  }

  async createAccessToken(user: UserAfterAuthen): Promise<string> {
    return (
      'Beaer ' +
      this.jwtService.sign(user, {
        expiresIn: process.env.STORE_TTL_ACCESS_TOKEN,
      })
    );
  }

  async createRefreshToken(user: UserAfterAuthen): Promise<string> {
    return (
      'Beaer ' +
      this.jwtService.sign(user, {
        expiresIn: process.env.STORE_TTL_REFRESH_TOKEN,
        secret: process.env.STORE_SECRET_REFRESH_TOKEN,
      })
    );
  }

  async login(user: UserAfterAuthen) {
    return this.createAccessToken(user);
  }

  async register(user_name: string, email: string, password: string) {
    const hash = await this.hashPassword(password);
    return this.prisma.user.create({});
  }
}
