import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength } from 'class-validator';

export class ForgotPasswordDTO {
  @ApiProperty({ default: 'locchau.220401@gmail.com' })
  @IsEmail({}, { message: 'Email is invalid format' })
  @MaxLength(100, { message: 'Lenght of email is maximum 100 character' })
  email: string;
}
