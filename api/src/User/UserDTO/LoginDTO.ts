import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class LoginDTO {
  @ApiProperty({ default: 'vanloc' })
  @MaxLength(100)
  @IsString()
  @Length(1, 50, { message: 'User name must have lengh 1-50 character' })
  username: string;

  @ApiProperty({
    default: 'vanloc',
  })
  @MaxLength(100)
  @IsString()
  @Length(1, 50, { message: 'User name must have lengh 1-50 character' })
  password: string;
}
