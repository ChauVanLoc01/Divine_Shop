import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateOrderDTO {
  @ApiProperty({
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => ItemDTO)
  items: ItemDTO[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;
}

export class ItemDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  item_id: string;

  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  @IsInt()
  buy_amount: number;
}
