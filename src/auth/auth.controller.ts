import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from 'src/shared/user.service';
import { loginDTO, registerDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) { }

  @Post('login')
  async login(@Body() data: loginDTO) {
    return await this.userService.login(data)
  }

  @Post('register')
  async register(@Body() data: registerDTO) {
    return await this.userService.create(data)
  }
}
