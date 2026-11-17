import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiInvalidInput, ApiNotFound, ApiPaginatedResponse, ApiProtected } from '../common/api-docs.js';
import { PaginationQueryDto } from '../common/dto/common.dto.js';
import {
  AlertQueryDto, AlertResponseDto, AlertRuleResponseDto, CreateAlertDto,
  CreateAlertRuleDto, UpdateAlertRuleDto,
} from './alerts.dto.js';
import { AlertRulesService, AlertsService } from './alerts.service.js';

@ApiTags('Alert Rules')
@ApiProtected()
@Controller('alert-rules')
export class AlertRulesController {
  constructor(private readonly rules: AlertRulesService) {}

  @Get()
  @ApiOperation({ summary: 'Lister les règles d’alerte' })
  @ApiPaginatedResponse(AlertRuleResponseDto)
  findAll(@Query() q: PaginationQueryDto) {
    return this.rules.findAll(q);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une règle (seuil, gravité) — Admin / DevOps' })
  @ApiCreatedResponse({ type: AlertRuleResponseDto })
  @ApiInvalidInput()
  create(@Body() dto: CreateAlertRuleDto) {
    return this.rules.add(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d’une règle' })
  @ApiOkResponse({ type: AlertRuleResponseDto })
  @ApiNotFound()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.rules.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier le seuil, la gravité ou activer/désactiver' })
  @ApiOkResponse({ type: AlertRuleResponseDto })
  @ApiInvalidInput()
  @ApiNotFound()
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateAlertRuleDto) {
    return this.rules.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Supprimer une règle (Admin)' })
  @ApiNoContentResponse({ description: 'Règle supprimée' })
  @ApiNotFound()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    this.rules.remove(id);
  }
}

@ApiTags('Alerts')
@ApiProtected()
@Controller('alerts')
export class AlertsController {
  constructor(private readonly alerts: AlertsService) {}

  @Get()
  @ApiOperation({ summary: 'Historique des incidents (filtres statut / gravité / serveur)' })
  @ApiPaginatedResponse(AlertResponseDto)
  findAll(@Query() q: AlertQueryDto) {
    return this.alerts.findAll(
      q,
      (a) => (!q.status || a.status === q.status) && (!q.severity || a.severity === q.severity) && (!q.serverId || a.serverId === q.serverId),
    );
  }

  @Post()
  @ApiOperation({ summary: 'Créer une alerte manuellement' })
  @ApiCreatedResponse({ type: AlertResponseDto })
  @ApiInvalidInput()
  @ApiNotFound()
  create(@Body() dto: CreateAlertDto) {
    return this.alerts.add(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d’une alerte' })
  @ApiOkResponse({ type: AlertResponseDto })
  @ApiNotFound()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.alerts.findOne(id);
  }

  @Patch(':id/acknowledge')
  @ApiOperation({ summary: 'Prendre en charge une alerte (OPEN → ACKNOWLEDGED)' })
  @ApiOkResponse({ type: AlertResponseDto })
  @ApiNotFound()
  acknowledge(@Param('id', ParseUUIDPipe) id: string) {
    return this.alerts.acknowledge(id);
  }

  @Patch(':id/resolve')
  @ApiOperation({ summary: 'Résoudre une alerte (→ RESOLVED)' })
  @ApiOkResponse({ type: AlertResponseDto })
  @ApiNotFound()
  resolve(@Param('id', ParseUUIDPipe) id: string) {
    return this.alerts.resolve(id);
  }
}
