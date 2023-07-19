import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { Strategy } from 'passport-local';
import { CustomValidationError } from '../types/CustomValidationError.type';
import { Response } from '../types/Response.type';
import { LoginDTO } from '../user/dto/login.dto';
import { UserService } from '../user/user.service';
import { validate, ValidationError } from 'class-validator';
import { user } from '@prisma/client';
import { UserWithLocal } from '../types/ReqWithLocal.type';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<UserWithLocal> {
    const login = plainToClass(LoginDTO, { email, password });
    const errors: ValidationError[] = await validate(login);
    if (errors.length > 0) {
      const data_err = errors.map((err) => {
        return {
          property: err.property,
          errors: err.constraints,
        } as CustomValidationError;
      });
      throw new HttpException(
        {
          message: 'Input of user invalid!',
          data: data_err,
        } as Response<CustomValidationError[]>,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result: user | string = await this.userService.validate(
      email,
      password,
    );
    if (typeof result === 'string') {
      throw new HttpException(result, HttpStatus.UNAUTHORIZED);
    }
    const { user_id, role } = result;
    return {
      user_id,
      role,
    };
  }
}
