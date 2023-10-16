import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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
  @Column()
  clicks: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
