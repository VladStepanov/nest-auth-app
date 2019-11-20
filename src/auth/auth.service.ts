import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { loginDTO, registerDTO, createdUser, jwtPayloadModel } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user: UserEntity = await this.userService.findByUsername(username)
  //   // const isPassCorrect = user && await bcrypt.compare(user.password, pass)
  //   // console.log(isPassCorrect)
  //   // if (isPassCorrect) {
  //   //   const { password, ...rest } = user
  //   //   return rest
  //   // }
  //   // return null
  // }

  async login(entryData: loginDTO): Promise<createdUser> {
    const user: UserEntity = await this.userService.findByUsername(entryData.username);

    const isPassCorrect = user && await bcrypt.compare(entryData.password, user.password);

    if (isPassCorrect) {
      const { username, id } = user;
      const payload: jwtPayloadModel = { username, id };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    } else {
      throw new HttpException('Bad credentials', HttpStatus.BAD_REQUEST);
    }
  }

  async create(data: registerDTO): Promise<createdUser> {
    const user = await this.userService.findByUsername(data.username);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const { username, id }: UserEntity = await this.userService.createUser(data);
    const payload: jwtPayloadModel = { username, id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
