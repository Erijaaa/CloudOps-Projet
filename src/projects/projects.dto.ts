import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';
import { Environment, MemberRole } from '../common/enums.js';
import { PaginationQueryDto } from '../common/dto/common.dto.js';

export class ProjectResponseDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty({ example: 'Plateforme e-commerce' }) name!: string;
  @ApiPropertyOptional({ example: 'Migration vers le cloud' }) description?: string;
  @ApiProperty({ enum: Environment }) environment!: Environment;
  @ApiProperty() createdAt!: string;
}

export class CreateProjectDto {
  @ApiProperty({ example: 'Plateforme e-commerce', minLength: 3 }) @IsString() @MinLength(3)
  name!: string;

  @ApiPropertyOptional({ example: 'Migration vers le cloud' }) @IsOptional() @IsString()
  description?: string;

  @ApiProperty({ enum: Environment, example: Environment.DEV }) @IsEnum(Environment)
  environment!: Environment;
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}

export class ProjectQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: Environment, description: 'Filtrer par environnement' })
  @IsOptional() @IsEnum(Environment)
  environment?: Environment;
}

export class ProjectMemberResponseDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty({ format: 'uuid' }) projectId!: string;
  @ApiProperty({ format: 'uuid' }) userId!: string;
  @ApiProperty({ enum: MemberRole }) memberRole!: MemberRole;
  @ApiProperty() createdAt!: string;
}

export class AddMemberDto {
  @ApiProperty({ format: 'uuid', description: 'Utilisateur à affecter au projet' }) @IsUUID()
  userId!: string;

  @ApiPropertyOptional({ enum: MemberRole, default: MemberRole.MEMBER }) @IsOptional() @IsEnum(MemberRole)
  memberRole?: MemberRole;
}
