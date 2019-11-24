import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { User } from '../types/User';

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

  @ManyToOne(type => UserEntity, user => user.products)
  @JoinColumn({ name: 'owner_id' })
  owner: UserEntity;
}
