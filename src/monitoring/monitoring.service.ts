import { Injectable } from '@nestjs/common';
import { MemoryService } from '../common/memory.service.js';
import { ServersService } from '../servers/servers.service.js';
import { CreateMetricDto, MetricResponseDto, UptimeResponseDto } from './monitoring.dto.js';

@Injectable()
export class MonitoringService extends MemoryService<MetricResponseDto> {
  protected readonly searchFields = [];
  constructor(private readonly servers: ServersService) { super(); }

  record(serverId: string, dto: CreateMetricDto) {
    this.servers.findOne(serverId);
    return this.create({ available: true, ...dto }, { serverId });
  }

  history(serverId: string, limit = 50) {
    this.servers.findOne(serverId);
    return this.items.filter((m) => m.serverId === serverId).slice(-limit).reverse();
  }

  uptime(serverId: string): UptimeResponseDto {
    this.servers.findOne(serverId);
    const list = this.items.filter((m) => m.serverId === serverId);
    const up = list.filter((m) => m.available).length;
    return { serverId, samples: list.length, uptimePercent: list.length ? +((up / list.length) * 100).toFixed(2) : 0 };
  }
}
