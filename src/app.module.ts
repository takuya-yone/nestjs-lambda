import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { HealthModule } from './health/health.module';
import { MembersModule } from './members/members.module';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { PrismaService } from './prisma/prisma.service';
import { UserResolver } from './user/user.resolver';
import { UserModule } from './user/user.module';
import { join } from 'path';

@Module({
  imports: [
    HealthModule,
    MembersModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [],
  providers: [PrismaService, UserResolver],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
