import { user } from '@prisma/client';
import { Req } from '@nestjs/common';

export type UserWithGoogle = {
  accessToken: string;
} & Pick<user, 'email' | 'name' | 'avatar'>;

export type ReqWithGoogle = typeof Req & { user: UserWithGoogle };
