import { HttpException } from '@nestjs/common';
import {
  FailResponse,
  ValidationFailResponse,
} from '../../types/Response.type';

export class MyException extends HttpException {
  constructor(private data: ValidationFailResponse | FailResponse) {
    super(data, data.status_code);
  }

  getData(): ValidationFailResponse | FailResponse {
    return this.data;
  }
}
