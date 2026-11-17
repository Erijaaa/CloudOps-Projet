import { ApiProperty } from '@nestjs/swagger';

export class DashboardSummaryDto {
  @ApiProperty({ example: 4 }) totalProjects!: number;
  @ApiProperty({ example: 10 }) totalServers!: number;
  @ApiProperty({ example: 8 }) onlineServers!: number;
  @ApiProperty({ example: 15 }) totalApplications!: number;
  @ApiProperty({ example: 3 }) openAlerts!: number;
  @ApiProperty({
    type: 'object',
    additionalProperties: { type: 'number' },
    example: { LOW: 1, MEDIUM: 1, HIGH: 1, CRITICAL: 0 },
    description: 'Nombre d’alertes ouvertes par gravité',
  })
  alertsBySeverity!: Record<string, number>;
  @ApiProperty({ example: 54.3, description: 'CPU moyen (%) sur les mesures enregistrées' }) avgCpu!: number;
  @ApiProperty({ example: 61.8, description: 'RAM moyenne (%) sur les mesures enregistrées' }) avgRam!: number;
}
