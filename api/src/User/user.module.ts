import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/Strategy/LocalStrategy';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from 'src/Strategy/GoogleStrategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.STORE_SECRET_ACCESS_TOKEN || 'chauvanloc',
    }),
  ],
  controllers: [UserController],
  providers: [UserService, LocalStrategy, GoogleStrategy],
})
export class UserModule {}
