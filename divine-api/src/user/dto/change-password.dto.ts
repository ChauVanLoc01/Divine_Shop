import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ChangePasswordDTO {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString({ message: 'Password must is a string' })
  @Length(1, 100, {
    message: 'Length of password is between 1 and 50 character',
  })
  current_password: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString({ message: 'Password must is a string' })
  @Length(1, 100, {
    message: 'Length of password is between 1 and 50 character',
  })
  new_password: string;
}
