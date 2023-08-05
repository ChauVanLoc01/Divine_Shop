import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '../strategies/local.strategy';
import { GoogleStrategy } from '../strategies/google.strategy';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_ACCESS_TOKEN,
    }),
    MailerModule.forRoot({
      transport: process.env.MAIL_TRANSPORT,
      defaults: {
        from: `No reply <${process.env.MAIL_FROM}>`,
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, LocalStrategy, GoogleStrategy],
})
export class UserModule {}
