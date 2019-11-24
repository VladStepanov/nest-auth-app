import { IsNumber, Length, MaxLength } from 'class-validator';

export abstract class ProductDto {
  @Length(4, 40)
  readonly title: string;

  @IsNumber()
  readonly price: number;

  @MaxLength(200)
  readonly desc: string;
}
