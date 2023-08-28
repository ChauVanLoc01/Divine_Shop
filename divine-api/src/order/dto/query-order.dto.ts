import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsISO8601,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { GreaterThan } from '../../commons/decorators/greater-than.decorator';

export class QueryOrderDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  order_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  item_name?: string;

  @ApiPropertyOptional()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsInt()
  total_price_min: number;

  @ApiPropertyOptional()
  @GreaterThan('total_price_min')
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsInt()
  total_price_max: number;

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
  order_by_total_price?: 'asc' | 'desc';

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  order_by_discount?: 'asc' | 'desc';

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

export type QueryOrder = Partial<InstanceType<typeof QueryOrderDTO>>;
