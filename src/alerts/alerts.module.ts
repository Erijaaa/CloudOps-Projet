import { Module } from '@nestjs/common';
import { ServersModule } from '../servers/servers.module.js';
import { AlertRulesController, AlertsController } from './alerts.controller.js';
import { AlertRulesService, AlertsService } from './alerts.service.js';

@Module({
  imports: [ServersModule],
  controllers: [AlertRulesController, AlertsController],
  providers: [AlertRulesService, AlertsService],
  exports: [AlertRulesService, AlertsService],
})
export class AlertsModule {}
