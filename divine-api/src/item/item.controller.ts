import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpStatus,
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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ItemQueryDTO } from './dto/item-query.dto';
import { Public } from '../commons/Metadata/public.metadata';
import { Admin } from '../commons/Metadata/role.metadata';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateItemDTO } from './dto/create-item.dto';
import { omit } from 'lodash';
import { MyException } from '../commons/filters/my.filter';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@ApiTags('Items')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Public()
  @Get()
  listItem(
    @Query()
    {
      many,
      item_name,
      category,
      price_max,
      price_min,
      order_by_created,
      order_by_item_name,
      order_by_price,
      order_by_sold,
      limit,
      page,
    }: ItemQueryDTO,
  ) {
    return this.itemService.getListItem(
      many,
      item_name,
      category,
      price_max,
      price_min,
      order_by_created,
      order_by_item_name,
      order_by_price,
      order_by_sold,
      limit,
      page,
    );
  }

  @Public()
  @Get(':slug')
  item(@Param('slug') slug: string) {
    return this.itemService.getDetail(slug);
  }

  @ApiBearerAuth()
  @Admin()
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateItemDTO,
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: process.cwd() + '/public/images',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  create(
    @UploadedFile(
      new ParseFilePipe({
        exceptionFactory(error) {
          throw new MyException({
            status_code: HttpStatus.BAD_REQUEST,
            message: error,
          });
        },
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
    @Body() body: CreateItemDTO,
  ) {
    return this.itemService.createItem({
      ...omit(body, ['image']),
      image: `${process.env.HOST_STORE}:${process.env.STORE_PORT}/${file.filename}`,
      item_id: uuidv4(),
    });
  }

  @ApiBearerAuth()
  @Admin()
  @Put('slug')
  update() {}

  @ApiBearerAuth()
  @Admin()
  @Delete(':slug')
  delete(@Param('slug') slug: string) {
    return this.itemService.delete(slug);
  }
}
