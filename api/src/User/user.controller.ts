import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LocalGuard } from 'src/Guards/LocalGuard';
import { LoginDTO } from './UserDTO/LoginDTO';
import { RequestWithUser } from 'src/Types/RequestWithUser.type';
import { RegisterDTO } from './UserDTO/RegisterDTO';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  login(@Body() body: LoginDTO, @Req() req: RequestWithUser) {
    return this.userService.login(req.user);
  }

  @Post('register')
  register(@Body() body: RegisterDTO) {
    return this.userService.register();
  }
}
