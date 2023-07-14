import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  isEmail,
} from 'class-validator';

export class RegisterDTO {
  @ApiProperty({ default: 'vanloc' })
  @MaxLength(100)
  @IsString()
  @Length(1, 50, { message: 'User name must have lengh 1-50 character' })
  username: string;

  @ApiProperty({ default: 'locchau.220401@gmail.com' })
  @IsEmail({}, { message: 'Email is invalid format' })
  @MaxLength(100, { message: 'Lenght of email is maximum 100 character' })
  email: string;

  @ApiProperty({
    default: 'vanloc',
  })
  @MaxLength(100)
  @IsString()
  @Length(1, 50, { message: 'User name must have lengh 1-50 character' })
  password: string;
}
