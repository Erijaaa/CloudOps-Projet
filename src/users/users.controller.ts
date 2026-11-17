import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Patch, Query } from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiInvalidInput, ApiNotFound, ApiPaginatedResponse, ApiProtected } from '../common/api-docs.js';
import { UpdateUserDto, UserQueryDto, UserResponseDto } from './users.dto.js';
import { UsersService } from './users.service.js';

@ApiTags('Users')
@ApiProtected()
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Lister les utilisateurs (pagination, recherche, filtre par rôle)' })
  @ApiPaginatedResponse(UserResponseDto)
  findAll(@Query() q: UserQueryDto) {
    return this.users.findAll(q, (u) => !q.role || u.role === q.role);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d’un utilisateur' })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiNotFound()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.users.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier le profil ou le rôle (Admin)' })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiInvalidInput()
  @ApiNotFound()
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateUserDto) {
    return this.users.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Supprimer un utilisateur (Admin)' })
  @ApiNoContentResponse({ description: 'Utilisateur supprimé' })
  @ApiNotFound()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    this.users.remove(id);
  }
}
