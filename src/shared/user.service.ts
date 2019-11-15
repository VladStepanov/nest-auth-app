import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { registerDTO, loginDTO } from 'src/auth/auth.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) { }

  async create(data: registerDTO): Promise<UserEntity> {
    const { username } = data
    const user = await this.userRepository.findOne({ username });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = this.userRepository.create(data)
    await this.userRepository.save(createdUser)
    return createdUser;
  }

  async login(data: loginDTO): Promise<any> {
    console.log('login')
    return 'login'
  }
}
