import { IsUrl } from 'class-validator';
import { UserWithoutPassword } from 'src/types/user';

export class CreateUrlDto {
  @IsUrl(undefined, { message: 'Must be a valid URL' })
  baseUrl: string;
  user: UserWithoutPassword;
}
