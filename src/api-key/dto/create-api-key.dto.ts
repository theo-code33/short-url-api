import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class CreateApiKeyDto {
  @ApiProperty({
    type: Number,
    description: 'User ID',
    example: 1,
  })
  user: User;
}
