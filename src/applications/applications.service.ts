import { Injectable } from '@nestjs/common';
import { MemoryService } from '../common/memory.service.js';
import { AppStatus } from '../common/enums.js';
import { ServersService } from '../servers/servers.service.js';
import { ApplicationResponseDto, CreateApplicationDto, UpdateApplicationDto } from './applications.dto.js';

@Injectable()
export class ApplicationsService extends MemoryService<ApplicationResponseDto> {
  protected readonly searchFields = ['name', 'version'];
  constructor(private readonly servers: ServersService) { super(); }

  add(dto: CreateApplicationDto) {
    this.servers.findOne(dto.serverId);
    return this.create({ status: AppStatus.RUNNING, ...dto });
  }

  edit(id: string, dto: UpdateApplicationDto) {
    if (dto.serverId) this.servers.findOne(dto.serverId);
    return this.update(id, dto);
  }
}
