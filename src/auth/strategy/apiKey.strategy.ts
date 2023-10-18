import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-headerapikey';
import { ApiKeyService } from 'src/api-key/api-key.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor(private readonly apiKeyService: ApiKeyService) {
    super({ header: 'X-API-KEY', prefix: '' }, true, async (apiKey, done) => {
      return this.validateApiKey(apiKey, done);
    });
  }

  async validateApiKey(apiKey: string, done: (error: Error, data) => void) {
    const apiKeyResponse = await this.apiKeyService.findByKey(apiKey);
    if (!apiKeyResponse) {
      return done(
        new HttpException('Invalid Api Key', HttpStatus.UNAUTHORIZED),
        null,
      );
    }
    return done(null, apiKeyResponse);
  }
}
