import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBearerAuth, ApiBadRequestResponse, ApiExtraModels, ApiForbiddenResponse,
  ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse, getSchemaPath,
} from '@nestjs/swagger';
import { ErrorResponseDto, PageDto } from './dto/common.dto.js';

/** Route protégée : JWT requis + réponses 401/403 documentées. */
export const ApiProtected = () =>
  applyDecorators(
    ApiBearerAuth('access-token'),
    ApiUnauthorizedResponse({ description: 'Token JWT manquant ou invalide', type: ErrorResponseDto }),
    ApiForbiddenResponse({ description: 'Rôle insuffisant', type: ErrorResponseDto }),
  );

export const ApiNotFound = () =>
  ApiNotFoundResponse({ description: 'Ressource introuvable', type: ErrorResponseDto });

export const ApiInvalidInput = () =>
  ApiBadRequestResponse({ description: 'Données invalides (validation DTO)', type: ErrorResponseDto });

/** Réponse paginée : { data: Model[], meta } */
export const ApiPaginatedResponse = <T extends Type<unknown>>(model: T) =>
  applyDecorators(
    ApiExtraModels(PageDto, model),
    ApiOkResponse({
      description: 'Liste paginée',
      schema: {
        allOf: [
          { $ref: getSchemaPath(PageDto) },
          { properties: { data: { type: 'array', items: { $ref: getSchemaPath(model) } } } },
        ],
      },
    }),
  );
