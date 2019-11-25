import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { ProductDto } from './product.dto';
import { UserService } from '../shared/user.service';
import { UserEntity } from '../entities/user.entity';
import { validate } from 'class-validator';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity) private productsRepository: Repository<ProductEntity>,
    private userService: UserService,
  ) { }
  async all(): Promise<ProductEntity[]> {
    return await this.productsRepository.find({ relations: ['owner'] });
  }
  async getUsersProducts(userId: string): Promise<ProductEntity[]> {
    return await this.productsRepository.find({ where: { owner_id: userId } });
  }
  async create(userId: string, productDto: ProductDto): Promise<ProductEntity> {
    const user: UserEntity = await this.userService.findById(userId);
    const product: ProductEntity = await this.productsRepository.create(productDto);
    product.owner = user;
    await this.productsRepository.save(product);
    return product;
  }
  async delete(userId: string, productId: string): Promise<ProductEntity> {
    const product: ProductEntity = await this.productsRepository.findOne({ where: { id: productId, owner_id: userId } });
    if (!product) {
      throw new HttpException('Product doesnt exist', HttpStatus.BAD_REQUEST);
    }
    await this.productsRepository.remove(product);
    return product;
  }
  // @TODO validation
  async update(userId: string, productId: string, productDto: Partial<ProductDto>): Promise<ProductEntity> {
    const product: ProductEntity = await this.productsRepository.findOne({ where: { id: productId, owner_id: userId } });
    if (!product) {
      throw new HttpException('Product doesnt exist', HttpStatus.BAD_REQUEST);
    }
    for (let key in productDto) {
      product[key] = productDto[key];
    };

    // @ts-ignore
    product.price = 'string'

    const errors = await validate(product);
    console.log(errors);
    if (errors.length >= 1) {
      throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
    }
    await this.productsRepository.save(product);
    return product;
  }
}
