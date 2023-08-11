import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class ResetPasswordDTO {
  @ApiProperty({ description: 'Your slug', required: true })
  @IsString()
  code: string;

  @ApiProperty({ description: 'Your current password', required: true })
  @IsString()
  @Length(1, 50, {
    message: 'Length of password is must between 1 and 50 character',
  })
  current_password: string;

  @ApiProperty({ description: 'Your new password', required: true })
  @IsString()
  @Length(1, 50, {
    message: 'Length of password is must between 1 and 50 character',
  })
  new_password: string;
}
