import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  findOne(@Query('email') email: string) {
    try {
      if (!email)
        throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);
      return this.userService.findOneByEmail(email);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.userService.update(+id, updateUserDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      if (!id)
        throw new HttpException('Id is required', HttpStatus.BAD_REQUEST);
      return this.userService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
