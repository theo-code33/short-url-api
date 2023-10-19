import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUrlDto } from './create-url.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUrlDto extends PartialType(
  OmitType(CreateUrlDto, ['user']),
) {
  @ApiProperty({
    required: true,
    type: String,
    description: 'Base URL',
    example: 'https://www.google.com',
  })
  baseUrl: string;
}
