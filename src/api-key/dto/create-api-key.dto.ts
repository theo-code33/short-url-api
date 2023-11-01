import { ApiProperty } from '@nestjs/swagger';
import { UserWithoutPassword } from 'src/types/user';

export class CreateApiKeyDto {
  @ApiProperty({
    type: Number,
    description: 'User ID',
    example: 1,
  })
  user: UserWithoutPassword;
}
