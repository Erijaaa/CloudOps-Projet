import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsEnum, IsInt, IsIP, IsOptional, IsString, Min } from 'class-validator';
import { ServerStatus } from '../common/enums.js';
import { PaginationQueryDto } from '../common/dto/common.dto.js';

export class ServerResponseDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty({ example: 'web-prod-01' }) name!: string;
  @ApiProperty({ example: 'AWS' }) provider!: string;
  @ApiProperty({ example: 'eu-west-3' }) region!: string;
  @ApiProperty({ example: 4, description: 'Nombre de vCPU' }) cpuCores!: number;
  @ApiProperty({ example: 8, description: 'RAM en Go' }) ramGb!: number;
  @ApiProperty({ example: 100, description: 'Stockage en Go' }) storageGb!: number;
  @ApiProperty({ example: '10.0.0.12' }) ipAddress!: string;
  @ApiProperty({ enum: ServerStatus }) status!: ServerStatus;
  @ApiProperty() createdAt!: string;
}

export class CreateServerDto {
  @ApiProperty({ example: 'web-prod-01' }) @IsString() name!: string;
  @ApiProperty({ example: 'AWS' }) @IsString() provider!: string;
  @ApiProperty({ example: 'eu-west-3' }) @IsString() region!: string;
  @ApiProperty({ example: 4, minimum: 1 }) @IsInt() @Min(1) cpuCores!: number;
  @ApiProperty({ example: 8, minimum: 1 }) @IsInt() @Min(1) ramGb!: number;
  @ApiProperty({ example: 100, minimum: 1 }) @IsInt() @Min(1) storageGb!: number;
  @ApiProperty({ example: '10.0.0.12' }) @IsIP() ipAddress!: string;
  @ApiPropertyOptional({ enum: ServerStatus, default: ServerStatus.ONLINE }) @IsOptional() @IsEnum(ServerStatus)
  status?: ServerStatus;
}

export class UpdateServerDto extends PartialType(CreateServerDto) {}

export class ServerQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: ServerStatus }) @IsOptional() @IsEnum(ServerStatus)
  status?: ServerStatus;

  @ApiPropertyOptional({ example: 'AWS' }) @IsOptional() @IsString()
  provider?: string;
}
