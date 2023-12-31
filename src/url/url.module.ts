import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { UserModule } from 'src/user/user.module';
import { ApiKeyModule } from 'src/api-key/api-key.module';

@Module({
  imports: [TypeOrmModule.forFeature([Url]), UserModule, ApiKeyModule],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
