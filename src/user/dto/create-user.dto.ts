import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @MinLength(8)
  password: string;
  @IsString()
  firstname: string;
  @IsString()
  lastname: string;
}
