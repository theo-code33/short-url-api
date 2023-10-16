import { IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsUrl(undefined, { message: 'Must be a valid URL' })
  baseUrl: string;
}
