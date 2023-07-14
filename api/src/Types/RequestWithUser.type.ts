import { Request } from '@nestjs/common';
import { UserAfterAuthen } from './UserAfterAuthen.type';

export type RequestWithUser = typeof Request & {
  user: UserAfterAuthen;
};
