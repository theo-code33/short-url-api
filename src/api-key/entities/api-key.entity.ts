import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ApiKey {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  apiKey: string;
  @ManyToOne(() => User, (user) => user.apiKeys)
  user: User;
  @CreateDateColumn()
  createdAt: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
