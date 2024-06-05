import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { Public } from './public.decorator';
import { HasPermissionService } from 'src/has-permission/has-permission.service';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private hasPermissionService: HasPermissionService,
  ) {}

  @Post('/register')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ id: string; token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ id: string; token: string }> {
    return this.authService.login(loginDto);
  }

  @Get('/perm/:docid/:userid')
  async hasPermission(@Param() params: any): Promise<{
    yroom: string;
    yaccess: string;
    yuserid: string;
  }> {
    const action = await this.hasPermissionService.hasUserAccessToWhiteboard(
      Number(params.userid),
      params.docid,
    );

    if (action === 'Denied') {
      throw new UnauthorizedException();
    }

    const yaccess = action === 'Read' ? 'r' : 'rw';

    return {
      yroom: params.docid,
      yaccess: yaccess,
      yuserid: params.userid,
    };
  }
}
