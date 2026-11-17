import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiInvalidInput, ApiNotFound, ApiProtected } from '../common/api-docs.js';
import { CreateMetricDto, MetricResponseDto, MetricsHistoryQueryDto, UptimeResponseDto } from './monitoring.dto.js';
import { MonitoringService } from './monitoring.service.js';

@ApiTags('Monitoring')
@ApiProtected()
@Controller('servers/:serverId')
export class MonitoringController {
  constructor(private readonly monitoring: MonitoringService) {}

  @Post('metrics')
  @ApiOperation({ summary: 'Enregistrer une mesure CPU/RAM (données simulées ou agent)' })
  @ApiCreatedResponse({ type: MetricResponseDto })
  @ApiInvalidInput()
  @ApiNotFound()
  record(@Param('serverId', ParseUUIDPipe) serverId: string, @Body() dto: CreateMetricDto) {
    return this.monitoring.record(serverId, dto);
  }

  @Get('metrics')
  @ApiOperation({ summary: 'Historique des mesures d’un serveur (plus récentes en premier)' })
  @ApiOkResponse({ type: [MetricResponseDto] })
  @ApiNotFound()
  history(@Param('serverId', ParseUUIDPipe) serverId: string, @Query() q: MetricsHistoryQueryDto) {
    return this.monitoring.history(serverId, q.limit);
  }

  @Get('uptime')
  @ApiOperation({ summary: 'Disponibilité d’un serveur' })
  @ApiOkResponse({ type: UptimeResponseDto })
  @ApiNotFound()
  uptime(@Param('serverId', ParseUUIDPipe) serverId: string) {
    return this.monitoring.uptime(serverId);
  }
}
