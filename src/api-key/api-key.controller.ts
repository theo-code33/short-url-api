import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api-key')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Post()
  @UseGuards(AuthGuard('auth'))
  create(@Body() createApiKeyDto: CreateApiKeyDto) {
    try {
      if (!createApiKeyDto.user)
        throw new HttpException('User required', HttpStatus.BAD_REQUEST);
      return this.apiKeyService.create(createApiKeyDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
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
