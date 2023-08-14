import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ADMIN_KEY } from '../Metadata/role.metadata';
import { UserWithLocal } from '../../types/ReqWithLocal.type';
import { IS_PUBLIC_KEY } from '../Metadata/public.metadata';
import { MyException } from '../filters/my.filter';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const isAdmin = this.reflector.getAllAndOverride(ADMIN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new MyException({
        status_code: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }
    try {
      const payload: UserWithLocal = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_ACCESS_TOKEN,
      });
      if (isAdmin && payload.role !== 'admin') {
        throw new MyException({
          status_code: HttpStatus.UNAUTHORIZED,
          message: 'Permission denied',
        });
      }
      request['user'] = payload;
    } catch (e) {
      throw new MyException({
        status_code: HttpStatus.UNAUTHORIZED,
        message: e.message,
      });
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
