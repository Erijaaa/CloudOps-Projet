import { Injectable } from '@nestjs/common';
import { AlertStatus, ServerStatus, Severity } from '../common/enums.js';
import { AlertsService } from '../alerts/alerts.service.js';
import { ApplicationsService } from '../applications/applications.service.js';
import { MonitoringService } from '../monitoring/monitoring.service.js';
import { ProjectsService } from '../projects/projects.service.js';
import { ServersService } from '../servers/servers.service.js';
import { DashboardSummaryDto } from './dashboard.dto.js';

@Injectable()
export class DashboardService {
  constructor(
    private readonly projects: ProjectsService,
    private readonly servers: ServersService,
    private readonly apps: ApplicationsService,
    private readonly alerts: AlertsService,
    private readonly monitoring: MonitoringService,
  ) {}

  summary(): DashboardSummaryDto {
    const open = this.alerts.all().filter((a) => a.status === AlertStatus.OPEN);
    const metrics = this.monitoring.all();
    const avg = (key: 'cpuUsage' | 'ramUsage') =>
      metrics.length ? +(metrics.reduce((s, m) => s + m[key], 0) / metrics.length).toFixed(1) : 0;

    return {
      totalProjects: this.projects.all().length,
      totalServers: this.servers.all().length,
      onlineServers: this.servers.all().filter((s) => s.status === ServerStatus.ONLINE).length,
      totalApplications: this.apps.all().length,
      openAlerts: open.length,
      alertsBySeverity: Object.fromEntries(Object.values(Severity).map((sev) => [sev, open.filter((a) => a.severity === sev).length])),
      avgCpu: avg('cpuUsage'),
      avgRam: avg('ramUsage'),
    };
  }
}
