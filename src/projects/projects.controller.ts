import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiInvalidInput, ApiNotFound, ApiPaginatedResponse, ApiProtected } from '../common/api-docs.js';
import { ErrorResponseDto } from '../common/dto/common.dto.js';
import {
  AddMemberDto, CreateProjectDto, ProjectMemberResponseDto, ProjectQueryDto,
  ProjectResponseDto, UpdateProjectDto,
} from './projects.dto.js';
import { ProjectsService } from './projects.service.js';

@ApiTags('Projects')
@ApiProtected()
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projects: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Lister les projets (pagination, recherche, filtre environnement)' })
  @ApiPaginatedResponse(ProjectResponseDto)
  findAll(@Query() q: ProjectQueryDto) {
    return this.projects.findAll(q, (p) => !q.environment || p.environment === q.environment);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un projet (Admin / DevOps)' })
  @ApiCreatedResponse({ type: ProjectResponseDto })
  @ApiInvalidInput()
  create(@Body() dto: CreateProjectDto) {
    return this.projects.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d’un projet' })
  @ApiOkResponse({ type: ProjectResponseDto })
  @ApiNotFound()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projects.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier un projet (Admin / DevOps)' })
  @ApiOkResponse({ type: ProjectResponseDto })
  @ApiInvalidInput()
  @ApiNotFound()
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateProjectDto) {
    return this.projects.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Supprimer un projet (Admin)' })
  @ApiNoContentResponse({ description: 'Projet supprimé' })
  @ApiNotFound()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    this.projects.remove(id);
  }

  @Get(':id/members')
  @ApiOperation({ summary: 'Lister les membres de l’équipe du projet' })
  @ApiOkResponse({ type: [ProjectMemberResponseDto] })
  @ApiNotFound()
  listMembers(@Param('id', ParseUUIDPipe) id: string) {
    return this.projects.listMembers(id);
  }

  @Post(':id/members')
  @ApiOperation({ summary: 'Affecter un utilisateur au projet' })
  @ApiCreatedResponse({ type: ProjectMemberResponseDto })
  @ApiConflictResponse({ description: 'Déjà affecté', type: ErrorResponseDto })
  @ApiInvalidInput()
  @ApiNotFound()
  addMember(@Param('id', ParseUUIDPipe) id: string, @Body() dto: AddMemberDto) {
    return this.projects.addMember(id, dto);
  }

  @Delete(':id/members/:userId')
  @HttpCode(204)
  @ApiOperation({ summary: 'Retirer un utilisateur du projet' })
  @ApiNoContentResponse({ description: 'Membre retiré' })
  @ApiNotFound()
  removeMember(@Param('id', ParseUUIDPipe) id: string, @Param('userId', ParseUUIDPipe) userId: string) {
    this.projects.removeMember(id, userId);
  }
}
