import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { ProductDto } from './product.dto';
import { UserService } from '../shared/user.service';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity) private productsRepository: Repository<ProductEntity>,
    private userService: UserService,
  ) {}
  async all(): Promise<ProductEntity[]> {
    return await this.productsRepository.find({ relations: ['owner'] });
  }
  async getUsersProducts(userId: string): Promise<ProductEntity[]> {
    return await this.productsRepository.find({ where: { owner_id: userId } });
  }
  async create(username: string, productDto: ProductDto): Promise<ProductEntity> {
    const user: UserEntity = await this.userService.findById(username);
    const product: ProductEntity = await this.productsRepository.create(productDto);
    product.owner = user;
    await this.productsRepository.save(product);
    return product;
  }
}
