import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get('THROTTLE_TTL'),
          limit: config.get('THROTTLE_LIMIT'),
        },
      ],
    }),
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
