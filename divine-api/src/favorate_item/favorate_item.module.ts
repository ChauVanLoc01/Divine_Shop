import { Module } from '@nestjs/common';
import { FavorateItemService } from './favorate_item.service';
import { FavorateItemController } from './favorate_item.controller';

@Module({
  controllers: [FavorateItemController],
  providers: [FavorateItemService],
})
export class FavorateItemModule {}
