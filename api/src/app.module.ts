import { Module } from '@nestjs/common';
import { UserModule } from './User/user.module';
import { PrismaService } from './Prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './Strategy/LocalStrategy';
import { PrismaModule } from './Prisma/prisma.module';

@Module({
  imports: [UserModule, PrismaModule],
})
export class AppModule {}
