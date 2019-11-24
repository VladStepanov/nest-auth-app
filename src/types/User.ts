import { ProductEntity } from '../entities/product.entity';

export abstract class User {
  readonly username: string;
  readonly password: string;
  readonly created: Date;
  readonly adress: string;
  readonly city: string;
  readonly state: string;
  readonly products?: ProductEntity[];
}
