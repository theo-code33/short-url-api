import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
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
    return this.apiKeyService.create(createApiKeyDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('auth'))
  remove(@Param('id') id: string) {
    return this.apiKeyService.remove(+id);
  }
}
