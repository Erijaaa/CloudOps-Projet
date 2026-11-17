import { Injectable } from '@nestjs/common';
import { MemoryService } from '../common/memory.service.js';
import { AlertStatus } from '../common/enums.js';
import { ServersService } from '../servers/servers.service.js';
import { AlertResponseDto, AlertRuleResponseDto, CreateAlertDto, CreateAlertRuleDto } from './alerts.dto.js';

@Injectable()
export class AlertRulesService extends MemoryService<AlertRuleResponseDto> {
  protected readonly searchFields = ['name'];
  constructor(private readonly servers: ServersService) { super(); }

  add(dto: CreateAlertRuleDto) {
    if (dto.serverId) this.servers.findOne(dto.serverId);
    return this.create({ enabled: true, ...dto });
  }
}

@Injectable()
export class AlertsService extends MemoryService<AlertResponseDto> {
  protected readonly searchFields = ['message'];
  constructor(private readonly servers: ServersService) { super(); }

  add(dto: CreateAlertDto) {
    this.servers.findOne(dto.serverId);
    return this.create({ status: AlertStatus.OPEN, ...dto });
  }

  acknowledge(id: string) { return this.update(id, { status: AlertStatus.ACKNOWLEDGED }); }
  resolve(id: string) { return this.update(id, { status: AlertStatus.RESOLVED, resolvedAt: new Date().toISOString() }); }
}
