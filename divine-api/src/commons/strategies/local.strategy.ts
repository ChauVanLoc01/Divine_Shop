import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { Strategy } from 'passport-local';
import { CustomValidationError } from '../../types/CustomValidationError.type';
import { LoginDTO } from '../../user/dto/login.dto';
import { UserService } from '../../user/user.service';
import { validate, ValidationError } from 'class-validator';
import { user } from '@prisma/client';
import { UserWithLocal } from '../../types/ReqWithLocal.type';
import { MyException } from '../filters/my.filter';

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
        return [err.property, err.constraints] as CustomValidationError;
      });
      throw new MyException({
        status_code: HttpStatus.BAD_REQUEST,
        message: 'Your input is wrong',
        errors: Object.fromEntries(data_err),
      });
    }
    const result: user | string = await this.userService.validate(
      email,
      password,
    );
    if (typeof result === 'string') {
      throw new MyException({
        status_code: HttpStatus.UNAUTHORIZED,
        message: result,
      });
    }
    const { user_id, role } = result;
    return {
      user_id,
      role,
    };
  }
}
