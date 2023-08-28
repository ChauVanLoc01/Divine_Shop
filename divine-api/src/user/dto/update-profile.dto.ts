import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateProfileDTO {
  @ApiPropertyOptional({
    required: true,
    type: 'string',
    format: 'binary',
  })
  avatar: Express.Multer.File;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(1, 50, { message: 'Độ dài tên từ 1-50 kí tự' })
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;
}
