import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ItemQueryDTO } from './dto/item-query.dto';
import { Public } from '../Metadata/public.metadata';
import { Admin } from '../Metadata/role.metadata';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateItemDTO } from './dto/create-item.dto';
import { omit } from 'lodash';

@ApiTags('Items')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Public()
  @Get()
  listItem(
    @Query()
    {
      category,
      price_max,
      price_min,
      order_by_created,
      order_by_item_name,
      order_by_price,
      limit,
      page,
    }: ItemQueryDTO,
  ) {
    return this.itemService.getListItem(
      category,
      price_max,
      price_min,
      order_by_created,
      order_by_item_name,
      order_by_price,
      limit,
      page,
    );
  }

  @Public()
  @Get(':slug')
  item(@Param('slug') slug: string) {
    return this.itemService.getDetail(Number(slug));
  }

  @Admin()
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateItemDTO,
  })
  @UseInterceptors(FileInterceptor('image', {}))
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: Number(process.env.SIZE_IMAGE) }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body: CreateItemDTO,
  ) {
    // return this.itemService.createItem({
    //   ...omit(body, 'image'),
    //   image: file.filename
    // });
  }

  @Admin()
  @Put('slug')
  update() {}

  @Admin()
  @Delete(':slug')
  delete(@Param('slug') slug: string) {
    return this.itemService.delete(Number(slug));
  }
}
