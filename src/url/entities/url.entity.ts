import { UserWithoutPassword } from 'src/types/user';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  baseUrl: string;
  @Column()
  slug: string;
  @Column({
    default: 0,
  })
  clicks: number;
  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
  })
  user: UserWithoutPassword;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
