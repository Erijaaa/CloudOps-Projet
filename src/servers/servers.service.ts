import { Injectable } from '@nestjs/common';
import { MemoryService } from '../common/memory.service.js';
import { ServerStatus } from '../common/enums.js';
import { CreateServerDto, ServerResponseDto } from './servers.dto.js';

@Injectable()
export class ServersService extends MemoryService<ServerResponseDto> {
  protected readonly searchFields = ['name', 'provider', 'region', 'ipAddress'];

  add(dto: CreateServerDto) {
    return this.create({ status: ServerStatus.ONLINE, ...dto });
  }
}
