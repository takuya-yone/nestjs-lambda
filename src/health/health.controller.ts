import { Controller, Get, Param, Req, ParseIntPipe } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}
  @Get()
  getHealth(@Req() request: Request): string {
    return this.healthService.getHealth(request);
  }
}
