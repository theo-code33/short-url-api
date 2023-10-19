import { Injectable } from '@nestjs/common';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { nanoid } from 'nanoid';
import { Repository } from 'typeorm';
import { ApiKey } from './entities/api-key.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKey)
    private readonly apiKeyRepository: Repository<ApiKey>,
    private readonly userService: UserService,
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

  async findUserByApiKey(apiKey: string) {
    const apiKeyResponse = await this.apiKeyRepository.findOne({
      where: { apiKey },
      relations: ['user'],
    });
    if (!apiKeyResponse) return null;
    return this.userService.sanitizeUser(apiKeyResponse.user);
  }

  remove(id: number) {
    return this.apiKeyRepository.delete(id);
  }
}
