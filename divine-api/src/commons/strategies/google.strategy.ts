import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';
import { UserWithGoogle } from '../../types/ReqWithGoogle.type';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `http://${process.env.HOST_STORE}:${
        process.env.STORE_PORT || 1234
      }/redirect`,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    { emails, photos, displayName }: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const user: UserWithGoogle = {
      name: displayName,
      email: emails[0].value,
      avatar: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
