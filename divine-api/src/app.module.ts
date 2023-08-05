import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtGuard } from './guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [UserModule, PrismaModule, PassportModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
