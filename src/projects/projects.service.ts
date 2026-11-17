import { ConflictException, Injectable } from '@nestjs/common';
import { MemoryService } from '../common/memory.service.js';
import { MemberRole } from '../common/enums.js';
import { AddMemberDto, ProjectMemberResponseDto, ProjectResponseDto } from './projects.dto.js';
import { randomUUID } from 'node:crypto';

@Injectable()
export class ProjectsService extends MemoryService<ProjectResponseDto> {
  protected readonly searchFields = ['name', 'description'];
  private members: ProjectMemberResponseDto[] = [];

  addMember(projectId: string, dto: AddMemberDto): ProjectMemberResponseDto {
    this.findOne(projectId);
    if (this.members.some((m) => m.projectId === projectId && m.userId === dto.userId)) {
      throw new ConflictException('Utilisateur déjà affecté à ce projet');
    }
    const member = {
      id: randomUUID(), projectId, userId: dto.userId,
      memberRole: dto.memberRole ?? MemberRole.MEMBER, createdAt: new Date().toISOString(),
    };
    this.members.push(member);
    return member;
  }

  listMembers(projectId: string) {
    this.findOne(projectId);
    return this.members.filter((m) => m.projectId === projectId);
  }

  removeMember(projectId: string, userId: string) {
    this.findOne(projectId);
    this.members = this.members.filter((m) => !(m.projectId === projectId && m.userId === userId));
  }
}
