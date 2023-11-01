import {
  Controller,
  Post,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserService } from 'src/user/user.service';
import jwtDecode from 'jwt-decode';
import { Payload } from 'src/types/auth';

@ApiTags('api-key')
@Controller('api-key')
export class ApiKeyController {
  constructor(
    private readonly apiKeyService: ApiKeyService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The Api Key has been successfully created.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  @UseGuards(AuthGuard('auth'))
  async create(@Req() req: Request) {
    try {
      if (!req.headers['authorization'])
        throw new HttpException('User required', HttpStatus.BAD_REQUEST);
      const payload = jwtDecode<Payload>(req.headers['authorization']);
      const user = await this.userService.findByPayload(payload);
      return this.apiKeyService.create({
        user,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'The Api Key has been successfully deleted.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  @UseGuards(AuthGuard('auth'))
  remove(@Param('id') id: string) {
    try {
      if (!id) throw new HttpException('Id required', HttpStatus.BAD_REQUEST);
      return this.apiKeyService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
