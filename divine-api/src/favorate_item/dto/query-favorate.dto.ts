import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { GreaterThan } from '../../commons/decorators/greater-than.decorator';

export class QueryFavorateDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  item_name?: string;

  @ApiPropertyOptional()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsInt()
  price_min?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => Number(value))
  @GreaterThan('price_min')
  @IsOptional()
  @IsInt()
  price_max?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => new Date(value).toISOString())
  @IsOptional()
  @IsDateString()
  start?: string;

  @ApiPropertyOptional()
  @Transform(({ value }) => new Date(value).toISOString())
  @IsOptional()
  @IsDateString()
  end?: string;

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  order_by_created?: 'asc' | 'desc';

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  order_by_price?: 'asc' | 'desc';

  @ApiPropertyOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsOptional()
  page?: number;
}

export type QueryFavorate = Partial<InstanceType<typeof QueryFavorateDTO>>;
