import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiInvalidInput, ApiNotFound, ApiPaginatedResponse, ApiProtected } from '../common/api-docs.js';
import { ApplicationQueryDto, ApplicationResponseDto, CreateApplicationDto, UpdateApplicationDto } from './applications.dto.js';
import { ApplicationsService } from './applications.service.js';

@ApiTags('Applications')
@ApiProtected()
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly apps: ApplicationsService) {}

  @Get()
  @ApiOperation({ summary: 'Lister les applications (filtres serveur / statut / environnement)' })
  @ApiPaginatedResponse(ApplicationResponseDto)
  findAll(@Query() q: ApplicationQueryDto) {
    return this.apps.findAll(
      q,
      (a) => (!q.serverId || a.serverId === q.serverId) && (!q.status || a.status === q.status) && (!q.environment || a.environment === q.environment),
    );
  }

  @Post()
  @ApiOperation({ summary: 'Déclarer une application sur un serveur (Admin / DevOps)' })
  @ApiCreatedResponse({ type: ApplicationResponseDto })
  @ApiInvalidInput()
  @ApiNotFound()
  create(@Body() dto: CreateApplicationDto) {
    return this.apps.add(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d’une application' })
  @ApiOkResponse({ type: ApplicationResponseDto })
  @ApiNotFound()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.apps.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier version / statut / environnement (Admin / DevOps)' })
  @ApiOkResponse({ type: ApplicationResponseDto })
  @ApiInvalidInput()
  @ApiNotFound()
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateApplicationDto) {
    return this.apps.edit(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Supprimer une application (Admin)' })
  @ApiNoContentResponse({ description: 'Application supprimée' })
  @ApiNotFound()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    this.apps.remove(id);
  }
}
