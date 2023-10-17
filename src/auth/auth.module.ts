import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { ApiKeyModule } from 'src/api-key/api-key.module';
import { AuthStrategy } from './strategy/auth.strategy';
import { ApiKeyStrategy } from './strategy/apiKey.strategy';

@Module({
  imports: [UserModule, ApiKeyModule],
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy, ApiKeyStrategy],
})
export class AuthModule {}
