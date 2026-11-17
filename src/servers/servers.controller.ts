import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiInvalidInput, ApiNotFound, ApiPaginatedResponse, ApiProtected } from '../common/api-docs.js';
import { CreateServerDto, ServerQueryDto, ServerResponseDto, UpdateServerDto } from './servers.dto.js';
import { ServersService } from './servers.service.js';

@ApiTags('Servers')
@ApiProtected()
@Controller('servers')
export class ServersController {
  constructor(private readonly servers: ServersService) {}

  @Get()
  @ApiOperation({ summary: 'Lister les serveurs (filtres statut / fournisseur, recherche, pagination)' })
  @ApiPaginatedResponse(ServerResponseDto)
  findAll(@Query() q: ServerQueryDto) {
    return this.servers.findAll(q, (s) => (!q.status || s.status === q.status) && (!q.provider || s.provider === q.provider));
  }

  @Post()
  @ApiOperation({ summary: 'Ajouter un serveur (Admin / DevOps)' })
  @ApiCreatedResponse({ type: ServerResponseDto })
  @ApiInvalidInput()
  create(@Body() dto: CreateServerDto) {
    return this.servers.add(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d’un serveur' })
  @ApiOkResponse({ type: ServerResponseDto })
  @ApiNotFound()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.servers.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier un serveur (Admin / DevOps)' })
  @ApiOkResponse({ type: ServerResponseDto })
  @ApiInvalidInput()
  @ApiNotFound()
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateServerDto) {
    return this.servers.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Supprimer un serveur (Admin)' })
  @ApiNoContentResponse({ description: 'Serveur supprimé' })
  @ApiNotFound()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    this.servers.remove(id);
  }
}
