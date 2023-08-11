import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { FailResponse } from '../types/Response.type';
import { Prisma } from '@prisma/client';
import { MyException } from './my.exception';

@Catch()
export class CatchEveryThing implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (exception instanceof MyException) {
      return response
        .status(exception.getData().status_code)
        .json(exception.getData());
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status_code: HttpStatus.INTERNAL_SERVER_ERROR,
      message:
        exception instanceof Prisma.PrismaClientValidationError
          ? 'Error when working with db'
          : 'Error BE',
    } as FailResponse);
  }
}
