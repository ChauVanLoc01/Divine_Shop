import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

export class RegisterDTO {
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
