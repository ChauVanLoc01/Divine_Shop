import {
  Controller,
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  UseGuards,
} from '@nestjs/common';
import {
  Body,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { UserService } from './user.service';
import { LocalGuard } from '../commons/guards/local.guard';
import { LoginDTO } from './dto/login.dto';
import { ReqWithLocal } from '../types/ReqWithLocal.type';
import { RegisterDTO } from './dto/register.dto';
import { ReqWithGoogle } from '../types/ReqWithGoogle.type';
import { GoogleGuard } from '../commons/guards/google.guard';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { Public } from '../commons/Metadata/public.metadata';
import { Request, Response } from 'express';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Admin } from '../commons/Metadata/role.metadata';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UpdateProfileDTO } from './dto/update-profile.dto';
import { MyException } from '../commons/filters/my.filter';

@ApiTags('Users')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @HttpCode(200)
  @UseGuards(LocalGuard)
  @Post('login')
  login(
    @Body() body: LoginDTO,
    @Req() req: ReqWithLocal,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.login(req.user, res);
  }

  @Public()
  @UseGuards(GoogleGuard)
  @Get('google')
  async loginWithGoogle() {}

  @Public()
  @UseGuards(GoogleGuard)
  @Get('redirect')
  googleAuthRedirect(@Req() req: ReqWithGoogle) {
    return this.userService.loginByGoogle(req.user);
  }

  @Public()
  @Post('register')
  register(
    @Body() { email, password, name }: RegisterDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.register(email, password, name, res);
  }

  @Public()
  @Get('password/forgot/:slug')
  forgotPassword(@Param('slug') slug: string) {
    return this.userService.forgotPassword(slug);
  }

  @HttpCode(200)
  @Public()
  @Put('password/forgot/reset')
  resetPassword(
    @Body() { code, current_password, new_password }: ResetPasswordDTO,
  ) {
    return this.userService.resetPassword(code, current_password, new_password);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Put('password/change')
  changePassword(
    @Req() req: ReqWithLocal,
    @Body() { current_password, new_password }: ChangePasswordDTO,
  ) {
    return this.userService.changePassword(
      req.user.user_id,
      current_password,
      new_password,
    );
  }

  @ApiBearerAuth()
  @Get('logout')
  logout(@Req() req: ReqWithLocal) {
    return this.userService.logout(
      req.user.user_id,
      req.headers.authorization,
      req.cookies['refresh_token'],
    );
  }

  @HttpCode(201)
  @Public()
  @Get('reset-token')
  renewToken(@Req() req: Request, @Res() res: Response) {
    return this.userService.renewToken(
      req.headers.authorization,
      req.cookies['refresh_token'],
      res,
    );
  }

  @ApiBearerAuth()
  @Admin()
  @Get('profiles')
  profilesCustomer() {
    return this.userService.profilesCustomer();
  }

  @ApiBearerAuth()
  @Admin()
  @Get('profiles/:slug')
  profilesDetailCustomer(@Param('slug') slug: string) {
    return this.userService.profilesDetailCustomer(slug);
  }

  @ApiBearerAuth()
  @Get('profile')
  profile(@Req() req: ReqWithLocal) {
    return this.userService.profile(req.user.user_id);
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateProfileDTO,
  })
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: process.cwd() + '/public/images',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  @Put('profile')
  update_profile(
    @UploadedFile(
      new ParseFilePipe({
        exceptionFactory(error) {
          throw new MyException({
            status_code: HttpStatus.BAD_REQUEST,
            message: error,
          });
        },
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @Body() body: UpdateProfileDTO,
    @Req() req: ReqWithLocal,
  ) {
    return this.userService.update_profile(
      req.user.user_id,
      body,
      file ? file.filename : undefined,
    );
  }
}
