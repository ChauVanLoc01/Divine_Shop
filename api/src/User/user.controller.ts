import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LocalGuard } from 'src/Guards/LocalGuard';
import { LoginDTO } from './UserDTO/LoginDTO';
import { RequestWithUser } from 'src/Types/RequestWithUser.type';
import { RegisterDTO } from './UserDTO/RegisterDTO';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  login(@Body() body: LoginDTO, @Req() req: RequestWithUser) {
    return this.userService.login(req.user);
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async loginWithGoogle() {}

  @UseGuards(AuthGuard('google'))
  @Get('redirect')
  googleAuthRedirect(@Req() req) {
    return req.user;
  }

  @Post('register')
  register(@Body() { email, password, username }: RegisterDTO) {
    return this.userService.register(username, email, password);
  }
}
