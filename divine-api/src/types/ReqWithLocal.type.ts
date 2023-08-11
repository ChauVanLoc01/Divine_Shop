import { Request } from 'express';

export type UserWithLocal = {
  user_id: number;
  role: 'admin' | 'user';
};

export type ReqWithLocal = Request & {
  user: UserWithLocal;
};
