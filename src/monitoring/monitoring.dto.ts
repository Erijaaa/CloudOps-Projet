import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class CreateMetricDto {
  @ApiProperty({ example: 45.5, minimum: 0, maximum: 100, description: 'Utilisation CPU (%)' })
  @IsNumber() @Min(0) @Max(100)
  cpuUsage!: number;

  @ApiProperty({ example: 62.1, minimum: 0, maximum: 100, description: 'Utilisation RAM (%)' })
  @IsNumber() @Min(0) @Max(100)
  ramUsage!: number;

  @ApiPropertyOptional({ default: true, description: 'Le serveur répondait-il au moment de la mesure ?' })
  @IsOptional() @IsBoolean()
  available?: boolean;
}

export class MetricResponseDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty({ format: 'uuid' }) serverId!: string;
  @ApiProperty({ example: 45.5 }) cpuUsage!: number;
  @ApiProperty({ example: 62.1 }) ramUsage!: number;
  @ApiProperty() available!: boolean;
  @ApiProperty({ description: 'Date de la mesure (ISO 8601)' }) createdAt!: string;
}

export class MetricsHistoryQueryDto {
  @ApiPropertyOptional({ default: 50, minimum: 1, maximum: 500, description: 'Nombre de mesures les plus récentes' })
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(500)
  limit?: number = 50;
}

export class UptimeResponseDto {
  @ApiProperty({ format: 'uuid' }) serverId!: string;
  @ApiProperty({ example: 99.2, description: 'Disponibilité en % sur les mesures enregistrées' }) uptimePercent!: number;
  @ApiProperty({ example: 120 }) samples!: number;
}
