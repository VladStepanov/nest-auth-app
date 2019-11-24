import { UserEntity } from '../entities/user.entity';

export abstract class Product {
  title: string;
  desc: string;
  price: number;
  owner: UserEntity;
}
