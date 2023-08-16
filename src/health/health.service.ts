import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class HealthService {
  getHealth(request: Request): string {
    return 'health check OK!';
  }

  async getHealthE2E(request: Request): Promise<string> {
    const record = await prisma.health.findUnique({
      where: {
        id: 1,
      },
    });
    // console.log(record);
    return record.message;
  }
}
