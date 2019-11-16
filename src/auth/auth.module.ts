import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SharedModule } from 'src/shared/shared.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  imports: [
    SharedModule,
    PassportModule,
    JwtModule.register({ secret: process.env.JWT_KEY, signOptions: { expiresIn: '7d' } })
  ],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
