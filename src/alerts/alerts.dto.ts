import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { AlertStatus, MetricType, Severity } from '../common/enums.js';
import { PaginationQueryDto } from '../common/dto/common.dto.js';

// ---- Règles (seuils configurables) ----
export class AlertRuleResponseDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty({ example: 'CPU élevé' }) name!: string;
  @ApiProperty({ enum: MetricType }) metric!: MetricType;
  @ApiProperty({ example: 85, description: 'Seuil (%) au-delà duquel une alerte est créée' }) threshold!: number;
  @ApiProperty({ enum: Severity }) severity!: Severity;
  @ApiPropertyOptional({ format: 'uuid', description: 'Vide = règle valable pour tous les serveurs' }) serverId?: string;
  @ApiProperty({ default: true }) enabled!: boolean;
  @ApiProperty() createdAt!: string;
}

export class CreateAlertRuleDto {
  @ApiProperty({ example: 'CPU élevé' }) @IsString() name!: string;
  @ApiProperty({ enum: MetricType }) @IsEnum(MetricType) metric!: MetricType;
  @ApiProperty({ example: 85, minimum: 0, maximum: 100 }) @IsNumber() @Min(0) @Max(100) threshold!: number;
  @ApiProperty({ enum: Severity }) @IsEnum(Severity) severity!: Severity;
  @ApiPropertyOptional({ format: 'uuid' }) @IsOptional() @IsUUID() serverId?: string;
  @ApiPropertyOptional({ default: true }) @IsOptional() @IsBoolean() enabled?: boolean;
}

export class UpdateAlertRuleDto extends PartialType(CreateAlertRuleDto) {}

// ---- Alertes / incidents ----
export class AlertResponseDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiPropertyOptional({ format: 'uuid' }) ruleId?: string;
  @ApiProperty({ format: 'uuid' }) serverId!: string;
  @ApiProperty({ enum: Severity }) severity!: Severity;
  @ApiProperty({ example: 'CPU à 92 % sur web-prod-01' }) message!: string;
  @ApiProperty({ enum: AlertStatus }) status!: AlertStatus;
  @ApiProperty({ description: 'Date de déclenchement' }) createdAt!: string;
  @ApiPropertyOptional({ description: 'Date de résolution' }) resolvedAt?: string;
}

export class CreateAlertDto {
  @ApiPropertyOptional({ format: 'uuid' }) @IsOptional() @IsUUID() ruleId?: string;
  @ApiProperty({ format: 'uuid' }) @IsUUID() serverId!: string;
  @ApiProperty({ enum: Severity }) @IsEnum(Severity) severity!: Severity;
  @ApiProperty({ example: 'CPU à 92 % sur web-prod-01' }) @IsString() message!: string;
}

export class AlertQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: AlertStatus }) @IsOptional() @IsEnum(AlertStatus) status?: AlertStatus;
  @ApiPropertyOptional({ enum: Severity }) @IsOptional() @IsEnum(Severity) severity?: Severity;
  @ApiPropertyOptional({ format: 'uuid' }) @IsOptional() @IsUUID() serverId?: string;
}
