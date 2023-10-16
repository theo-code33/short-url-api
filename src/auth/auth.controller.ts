import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      console.log('auth controller');
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
  async login() {
    return 'login';
  }
}
