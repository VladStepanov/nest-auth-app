import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  username: string

  @Column('text')
  password: string;

  @CreateDateColumn()
  created: Date;

  @Column()
  adress: string;

  @Column()
  city: string;

  @Column()
  state: string
}