import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getHealth(request: Request): string {
    return 'health check OK!';
  }
}
