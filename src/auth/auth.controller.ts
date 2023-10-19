import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './dto/login-dto';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  @ApiOkResponse({
    description: 'The user has been successfully registered.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      const payload = {
        email: user.email,
      };
      const token = await this.authService.signPayload(payload);
      return { user, token };
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('login')
  @ApiOkResponse({
    description: 'The user has been successfully logged in.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  async login(@Body() loginDTO: LoginDto) {
    try {
      const user = await this.userService.findByLogin(loginDTO);

      const payload = {
        email: user.email,
      };
      const token = await this.authService.signPayload(payload);
      return { user, token };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
