import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { AppStatus, Environment } from '../common/enums.js';
import { PaginationQueryDto } from '../common/dto/common.dto.js';

export class ApplicationResponseDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty({ example: 'api-gateway' }) name!: string;
  @ApiProperty({ example: '1.4.2' }) version!: string;
  @ApiProperty({ enum: Environment }) environment!: Environment;
  @ApiProperty({ enum: AppStatus }) status!: AppStatus;
  @ApiProperty({ format: 'uuid', description: 'Serveur hôte' }) serverId!: string;
  @ApiProperty() createdAt!: string;
}

export class CreateApplicationDto {
  @ApiProperty({ example: 'api-gateway' }) @IsString() name!: string;
  @ApiProperty({ example: '1.4.2' }) @IsString() version!: string;
  @ApiProperty({ enum: Environment }) @IsEnum(Environment) environment!: Environment;
  @ApiPropertyOptional({ enum: AppStatus, default: AppStatus.RUNNING }) @IsOptional() @IsEnum(AppStatus) status?: AppStatus;
  @ApiProperty({ format: 'uuid' }) @IsUUID() serverId!: string;
}

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {}

export class ApplicationQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ format: 'uuid' }) @IsOptional() @IsUUID() serverId?: string;
  @ApiPropertyOptional({ enum: AppStatus }) @IsOptional() @IsEnum(AppStatus) status?: AppStatus;
  @ApiPropertyOptional({ enum: Environment }) @IsOptional() @IsEnum(Environment) environment?: Environment;
}
