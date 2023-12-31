import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { GreaterThan } from '../../commons/decorators/greater-than.decorator';
import { Transform } from 'class-transformer';

export class ItemQueryDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  many?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  item_name?: string;

  @ApiPropertyOptional({
    enum: [
      'entertainment',
      'work',
      'learn',
      'game_steam',
      'ea_games',
      'window_office',
      'google_drive',
      'steam_wallet',
      'google_play_itune',
    ],
  })
  @IsOptional()
  @IsEnum(
    [
      'entertainment',
      'work',
      'learn',
      'game_steam',
      'ea_games',
      'window_office',
      'google_drive',
      'steam_wallet',
      'google_play_itune',
    ],
    {
      message: `category must is a enum type like: entertainment | work | learn | game_steam | ea_games | window_office | google_drive | steam_wallet | google_play_itune`,
    },
  )
  category?:
    | 'entertainment'
    | 'work'
    | 'learn'
    | 'game_steam'
    | 'ea_games'
    | 'window_office'
    | 'google_drive'
    | 'steam_wallet'
    | 'google_play_itune';

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  price_min: number;

  @ApiPropertyOptional()
  @GreaterThan('price_min')
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  price_max: number;

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'], {
    message: 'Order by created must be enum type like: asc | desc',
  })
  order_by_created: 'asc' | 'desc';

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'], {
    message: 'Order by item name must be enum type like: asc | desc',
  })
  order_by_item_name: 'asc' | 'desc';

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  order_by_price: 'asc' | 'desc';

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  order_by_sold: 'asc' | 'desc';

  @ApiPropertyOptional({
    default: 10,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  limit: number;

  @ApiPropertyOptional({
    default: 1,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  page: number;
}
