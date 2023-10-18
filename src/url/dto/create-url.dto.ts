import { IsUrl } from 'class-validator';
import { UserWithoutPassword } from 'src/types/user';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUrlDto {
  @ApiProperty({
    type: String,
    description: 'Base URL',
    example: 'https://www.google.com',
  })
  @IsUrl(undefined, { message: 'Must be a valid URL' })
  baseUrl: string;
  @ApiProperty({
    type: Number,
    description: 'User ID',
    example: 1,
  })
  user: UserWithoutPassword;
}
