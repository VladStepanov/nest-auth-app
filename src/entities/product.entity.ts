import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  desc: string;

  @Column('int')
  price: number;
}