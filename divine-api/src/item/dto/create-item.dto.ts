import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { GreaterThan } from '../../commons/decorators/greater-than.decorator';
import { Transform } from 'class-transformer';

export class CreateItemDTO {
  @ApiProperty({
    required: true,
    type: 'string',
    format: 'binary',
  })
  image: Express.Multer.File;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @Length(1, 500, { message: 'Length of item name is 1-50 character' })
  @IsNotEmpty({ message: 'Name item is not empty' })
  item_name: string;

  @ApiProperty({
    required: true,
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty({ message: 'Price is not empty' })
  price: number;

  @ApiPropertyOptional({
    description: 'Price before discount is must greater than price',
  })
  @GreaterThan('price')
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  priceBeforeDiscount?: number;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Quantity is not empty' })
  @Transform(({ value }) => Number(value))
  @IsInt()
  quantity: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
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
  @IsNotEmpty({ message: 'Category is not empty' })
  @IsEnum([
    'entertainment',
    'work',
    'learn',
    'game_steam',
    'ea_games',
    'window_office',
    'google_drive',
    'steam_wallet',
    'google_play_itune',
  ])
  category:
    | 'entertainment'
    | 'work'
    | 'learn'
    | 'game_steam'
    | 'ea_games'
    | 'window_office'
    | 'google_drive'
    | 'steam_wallet'
    | 'google_play_itune';
}
