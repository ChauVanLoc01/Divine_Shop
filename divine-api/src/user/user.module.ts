import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '../commons/strategies/local.strategy';
import { GoogleStrategy } from '../commons/strategies/google.strategy';
import { BullModule } from '@nestjs/bull';
import { MailConsummer } from '../utils/consummers/mail.consummer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email',
    }),
    JwtModule.register({
      secret: process.env.SECRET_ACCESS_TOKEN,
    }),
    PassportModule,
  ],
  controllers: [UserController],
  providers: [UserService, LocalStrategy, GoogleStrategy, MailConsummer],
})
export class UserModule {}
