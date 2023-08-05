import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { APP_GUARD } from '@nestjs/core';

import { HealthModule } from './health/health.module';
import { MembersModule } from './members/members.module';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HealthModule,
    MembersModule,
    UsersModule,
    PostsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // path: '/api/graphql',
      playground: true,
      // include: [UsersModule],
    }),
    AuthModule,

    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('THROTTLE_TTL'),
        limit: config.get('THROTTLE_LIMIT'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
