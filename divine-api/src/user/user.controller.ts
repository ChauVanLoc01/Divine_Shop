import { Controller, UseGuards } from '@nestjs/common';
import { Body, Get, Post, Req } from '@nestjs/common/decorators';
import { UserService } from './user.service';
import { LocalGuard } from '../guards/local.guard';
import { LoginDTO } from './dto/login.dto';
import { ReqWithLocal } from '../types/ReqWithLocal.type';
import { RegisterDTO } from './dto/register.dto';
import { ReqWithGoogle } from '../types/ReqWithGoogle.type';
import { GoogleGuard } from '../guards/google.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  login(@Body() body: LoginDTO, @Req() req: ReqWithLocal) {
    return this.userService.login(req.user);
  }

  @UseGuards(GoogleGuard)
  @Get('google')
  async loginWithGoogle() {}

  @UseGuards(GoogleGuard)
  @Get('redirect')
  googleAuthRedirect(@Req() req: ReqWithGoogle) {
    return this.userService.loginByGoogle(req.user);
  }

  @Post('register')
  register(@Body() { email, password }: RegisterDTO) {
    return this.userService.register(email, password);
  }

  @Get()
  wellcome() {
    return 'Hello World';
  }
}
