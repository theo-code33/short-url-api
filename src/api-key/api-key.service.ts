import { Injectable } from '@nestjs/common';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { nanoid } from 'nanoid';
import { Repository } from 'typeorm';
import { ApiKey } from './entities/api-key.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKey)
    private readonly apiKeyRepository: Repository<ApiKey>,
  ) {}
  create(createApiKeyDto: CreateApiKeyDto) {
    const apiKey = nanoid(32);
    return this.apiKeyRepository.save({ ...createApiKeyDto, apiKey });
  }
  async findByKey(apiKey: string) {
    const apiKeyResponse = await this.apiKeyRepository.findOne({
      where: { apiKey },
    });
    if (!apiKeyResponse) return null;
    return apiKeyResponse.apiKey;
  }

  remove(id: number) {
    return this.apiKeyRepository.delete(id);
  }
}
