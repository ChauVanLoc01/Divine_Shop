import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/Strategy/LocalStrategy';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
