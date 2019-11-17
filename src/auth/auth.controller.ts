import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { loginDTO, registerDTO, createdUser } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  test() {
    return 'only for authorized users';
  }

  @Post('login')
  async login(@Body() data: loginDTO): Promise<createdUser> {
    return await this.authService.login(data);
  }

  @Post('register')
  async register(@Body() data: registerDTO): Promise<createdUser> {
    return await this.authService.create(data);
  }
}
