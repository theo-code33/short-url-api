import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    type: Number,
    description: 'Url ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: 'Base URL',
    example: 'https://www.google.com',
  })
  @Column()
  baseUrl: string;

  @ApiProperty({
    type: String,
    description: 'Slug',
    example: 'zrgdfg',
  })
  @Column()
  slug: string;

  @ApiProperty({
    type: Number,
    description: 'Clicks',
    example: 0,
  })
  @Column({
    default: 0,
  })
  clicks: number;

  @ApiProperty({
    description: 'User',
  })
  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
  })
  user: UserWithoutPassword;

  @ApiProperty({
    type: Date,
    description: 'Created at',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Updated at',
  })
  @UpdateDateColumn()
  updatedAt?: Date;

  @ApiProperty({
    type: Date,
    description: 'Deleted at',
  })
  @DeleteDateColumn()
  deletedAt?: Date;
}
