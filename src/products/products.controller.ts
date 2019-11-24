import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { User } from '../utilities/user.decorator';
import { ProductDto } from './product.dto';
import { ProductEntity } from '../entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async all(): Promise<ProductEntity[]> {
    return await this.productsService.all();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/my')
  async getUsersProducts(@User() userId: string): Promise<ProductEntity[]> {
    return await this.productsService.getUsersProducts(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('')
  create(
    @User() userId: string,
    @Body() product: ProductDto,
  ): Promise<ProductEntity> {
    return this.productsService.create(userId, product);
  }
}
