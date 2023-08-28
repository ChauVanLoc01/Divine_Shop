import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFavorateDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  item_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  receive_email: boolean;
}

export type CreateFavorate = InstanceType<typeof CreateFavorateDTO>;
