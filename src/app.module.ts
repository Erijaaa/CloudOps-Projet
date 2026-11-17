import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { ProjectsModule } from './projects/projects.module.js';
import { ServersModule } from './servers/servers.module.js';
import { MonitoringModule } from './monitoring/monitoring.module.js';
import { ApplicationsModule } from './applications/applications.module.js';
import { AlertsModule } from './alerts/alerts.module.js';
import { DashboardModule } from './dashboard/dashboard.module.js';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProjectsModule,
    ServersModule,
    MonitoringModule,
    ApplicationsModule,
    AlertsModule,
    DashboardModule,
  ],
})
export class AppModule {}
