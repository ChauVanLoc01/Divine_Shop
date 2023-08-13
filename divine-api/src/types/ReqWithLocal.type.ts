import { Request } from 'express';

export type UserWithLocal = {
  user_id: string;
  role: 'admin' | 'user';
};

export type ReqWithLocal = Request & {
  user: UserWithLocal;
};
