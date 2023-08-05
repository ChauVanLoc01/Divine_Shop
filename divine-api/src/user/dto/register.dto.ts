import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

export class RegisterDTO {
  @ApiProperty({
    description: 'Your Name',
    required: true,
  })
  @IsString()
  @Length(1, 50, { message: 'Length of name is between 1 and 50 character' })
  name: string;

  @ApiProperty({
    default: 'locchau.220401@gmail.com',
    required: true,
  })
  @IsEmail({}, { message: 'Email is invalid format' })
  @MaxLength(100, { message: 'Lenght of email is maximum 100 character' })
  email: string;

  @ApiProperty({
    default: 'vanloc',
    required: true,
  })
  @MaxLength(100)
  @IsString()
  @Length(1, 50, { message: 'User name must have lengh 1-50 character' })
  password: string;
}
