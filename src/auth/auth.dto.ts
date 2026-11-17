import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { UserResponseDto } from '../users/users.dto.js';

export class RegisterDto {
  @ApiProperty({ example: 'maram@example.com' }) @IsEmail()
  email!: string;

  @ApiProperty({ example: 'Maram Ben Ali', minLength: 2 }) @IsString() @MinLength(2)
  fullName!: string;

  @ApiProperty({ example: 'Str0ngP@ssw0rd', minLength: 8 }) @IsString() @MinLength(8)
  password!: string;
}

export class LoginDto {
  @ApiProperty({ example: 'maram@example.com' }) @IsEmail()
  email!: string;

  @ApiProperty({ example: 'Str0ngP@ssw0rd' }) @IsString()
  password!: string;
}

export class TokenResponseDto {
  @ApiProperty({ description: 'JWT à envoyer dans Authorization: Bearer <token>' })
  accessToken!: string;

  @ApiProperty({ type: UserResponseDto })
  user!: UserResponseDto;
}
