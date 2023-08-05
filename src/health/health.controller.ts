import {
  Controller,
  Get,
  Param,
  Req,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { HealthService } from './health.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}
  @Get()
  @UseGuards(ThrottlerGuard)
  getHealth(@Req() request: Request): string {
    return this.healthService.getHealth(request);
  }
}
