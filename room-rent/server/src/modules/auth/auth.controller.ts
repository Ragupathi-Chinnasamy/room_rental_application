import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async WebUserLogin(
    @Body() signInCredentials: SignInDto,
    @Req() req: Request,
  ) {
    console.log(req?.headers);

    const result = await this.authService.SignIn(signInCredentials);

    return {
      status: true,
      data: result,
      message: 'Logged In Successfully',
    };
  }
}
