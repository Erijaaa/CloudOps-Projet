import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @ApiPropertyOptional({ default: 1, minimum: 1, description: 'Numéro de page' })
  @IsOptional() @Type(() => Number) @IsInt() @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 10, minimum: 1, maximum: 100, description: 'Éléments par page' })
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Recherche textuelle', example: 'prod' })
  @IsOptional() @IsString()
  search?: string;
}

export class PageMetaDto {
  @ApiProperty({ example: 42 }) total!: number;
  @ApiProperty({ example: 1 }) page!: number;
  @ApiProperty({ example: 10 }) limit!: number;
  @ApiProperty({ example: 5 }) totalPages!: number;
}

export class PageDto {
  @ApiProperty({ type: 'array', items: {} }) data!: unknown[];
  @ApiProperty({ type: PageMetaDto }) meta!: PageMetaDto;
}

export class ErrorResponseDto {
  @ApiProperty({ example: 404 }) statusCode!: number;
  @ApiProperty({ example: 'Ressource introuvable', oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }] })
  message!: string | string[];
  @ApiProperty({ example: '/projects/123' }) path!: string;
  @ApiProperty({ example: '2026-11-17T10:00:00.000Z' }) timestamp!: string;
}
