import { Module } from '@nestjs/common';
import { AlertsModule } from '../alerts/alerts.module.js';
import { ApplicationsModule } from '../applications/applications.module.js';
import { MonitoringModule } from '../monitoring/monitoring.module.js';
import { ProjectsModule } from '../projects/projects.module.js';
import { ServersModule } from '../servers/servers.module.js';
import { DashboardController } from './dashboard.controller.js';
import { DashboardService } from './dashboard.service.js';

@Module({
  imports: [ProjectsModule, ServersModule, ApplicationsModule, AlertsModule, MonitoringModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
