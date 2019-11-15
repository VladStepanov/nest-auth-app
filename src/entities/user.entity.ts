import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, BeforeUpdate, AfterLoad } from "typeorm";
import * as bcrypt from 'bcrypt'

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

  private tempPassword: string

  @AfterLoad()
  loadTempPassword(): void {
    this.tempPassword = this.password
  }

  @BeforeInsert()
  @BeforeUpdate()
  async generatePassword(): Promise<void> {
    if (this.tempPassword !== this.password) {
      const hashed = await bcrypt.hash(this.password, 10);
      this.password = hashed;
    }
  }
}