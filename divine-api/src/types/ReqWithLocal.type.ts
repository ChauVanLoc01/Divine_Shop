import { Req } from '@nestjs/common/decorators';

export type UserWithLocal = {
  user_id: number;
  role: 'admin' | 'user';
};

export type ReqWithLocal = typeof Req & {
  user: UserWithLocal;
};
