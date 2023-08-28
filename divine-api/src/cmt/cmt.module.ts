import { Module } from '@nestjs/common';
import { CmtService } from './cmt.service';
import { CmtController } from './cmt.controller';

@Module({
  controllers: [CmtController],
  providers: [CmtService],
})
export class CmtModule {}
