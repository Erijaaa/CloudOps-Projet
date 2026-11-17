import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../common/enums.js';
import { PaginationQueryDto } from '../common/dto/common.dto.js';

export class UserResponseDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty({ example: 'maram@example.com' }) email!: string;
  @ApiProperty({ example: 'Maram Ben Ali' }) fullName!: string;
  @ApiProperty({ enum: Role, example: Role.VIEWER }) role!: Role;
  @ApiProperty() createdAt!: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Maram Ben Ali' }) @IsOptional() @IsString() @MinLength(2)
  fullName?: string;

  @ApiPropertyOptional({ enum: Role, description: 'Modifiable par un Admin uniquement' })
  @IsOptional() @IsEnum(Role)
  role?: Role;
}

export class UserQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: Role, description: 'Filtrer par rôle' })
  @IsOptional() @IsEnum(Role)
  role?: Role;
}
