import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, BeforeUpdate, AfterLoad, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Product } from '../types/Product';
import { ProductEntity } from './product.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text')
  username: string;


  @CreateDateColumn()
  created: Date;

  @Column()
  adress: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @OneToMany(() => ProductEntity, product => product.owner)
  products: ProductEntity[];

  @Exclude()
  @Column('text')
  password: string;

  @Exclude()
  private tempPassword: string;

  @AfterLoad()
  loadTempPassword(): void {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async generatePassword(): Promise<void> {
    if (this.tempPassword !== this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
