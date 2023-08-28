import { Controller } from '@nestjs/common';
import { CmtService } from './cmt.service';

@Controller('cmt')
export class CmtController {
  constructor(private readonly cmtService: CmtService) {}
}
