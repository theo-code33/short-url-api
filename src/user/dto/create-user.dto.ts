import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Email',
    example: 'test@test.com',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    type: String,
    description: 'Password',
    example: '12345678',
    minLength: 8,
  })
  @MinLength(8)
  password: string;
  @ApiProperty({
    type: String,
    description: 'First name',
    example: 'John',
  })
  @IsString()
  firstname: string;
  @ApiProperty({
    type: String,
    description: 'Last name',
    example: 'Doe',
  })
  @IsString()
  lastname: string;
}
