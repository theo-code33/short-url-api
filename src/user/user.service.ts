import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserWithoutPassword } from 'src/types/user';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/auth/dto/login-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hash;
    const createdUser = await this.userRepository.save(createUserDto);
    return this.sanitizeUser(createdUser);
  }

  async findByLogin(UserDto: LoginDto): Promise<UserWithoutPassword> {
    const { email, password } = UserDto;

    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const passwordValid = await bcrypt.compare(password, user.password);

    if (passwordValid) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async findOneByEmail(email: string): Promise<UserWithoutPassword> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    return this.sanitizeUser(user);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  sanitizeUser(user: User): UserWithoutPassword {
    const sanitized = user;
    delete sanitized.password;
    return sanitized;
  }
}
