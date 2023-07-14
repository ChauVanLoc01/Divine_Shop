import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/User/user.service';
import { UserAfterAuthen } from 'src/Types/UserAfterAuthen.type';
import { user as UserModel } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { LoginDTO } from 'src/user/UserDTO/LoginDTO';
import { ValidationError, validate } from 'class-validator';
import { ApiResponse } from 'src/Types/ApiResponse.type';
import { ErrorValidate } from 'src/Types/ErrorValidate.type';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserAfterAuthen> {
    const login = plainToClass(LoginDTO, { username, password });
    const errors: ValidationError[] = await validate(login);
    if (errors.length > 0) {
      const data_err = errors.map((err) => {
        return {
          property: err.property,
          errors: err.constraints,
        } as ErrorValidate;
      });
      throw new HttpException(
        {
          message: 'Input of user invalid!',
          data: data_err,
        } as ApiResponse<ErrorValidate[]>,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result: UserModel | string = await this.userService.validate(
      username,
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
