import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { FavorateItemService } from './favorate_item.service';
import { ReqWithLocal } from '../types/ReqWithLocal.type';
import { CreateFavorateDTO } from './dto/create-favorate.dto';
import { QueryFavorateDTO } from './dto/query-favorate.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Favorate Items')
@ApiBearerAuth()
@Controller('favorates')
export class FavorateItemController {
  constructor(private readonly favorateItemService: FavorateItemService) {}

  @Get()
  all(@Req() req: ReqWithLocal, @Query() query: QueryFavorateDTO) {
    return this.favorateItemService.all(req.user.user_id, query);
  }

  @Get(':slug')
  detailt(@Req() req: ReqWithLocal, @Param('slug') slug: string) {
    return this.favorateItemService.detail(req.user.user_id, slug);
  }

  @Post()
  createFavorate(@Req() req: ReqWithLocal, @Body() body: CreateFavorateDTO) {
    return this.favorateItemService.createFavorate(req.user.user_id, body);
  }

  @Delete(':slug')
  delete(@Param('slug') slug: string, @Req() req: ReqWithLocal) {
    return this.favorateItemService.delete(req.user.user_id, slug);
  }
}
