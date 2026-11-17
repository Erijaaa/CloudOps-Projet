import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiProtected } from '../common/api-docs.js';
import { DashboardSummaryDto } from './dashboard.dto.js';
import { DashboardService } from './dashboard.service.js';

@ApiTags('Dashboard')
@ApiProtected()
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboard: DashboardService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Compteurs et indicateurs globaux (tous rôles)' })
  @ApiOkResponse({ type: DashboardSummaryDto })
  summary() {
    return this.dashboard.summary();
  }
}
