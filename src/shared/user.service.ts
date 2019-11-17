import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { registerDTO } from '../auth/auth.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  ) { }

  async findByUsername(username: string): Promise<UserEntity> {
    return this.userRepository.findOne({ username });
  }

  async createUser(data: registerDTO) {
    const user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user;
  }
}
