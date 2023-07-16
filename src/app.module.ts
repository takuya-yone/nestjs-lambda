import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { HealthModule } from './health/health.module';
import { MembersModule } from './members/members.module';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { PrismaService } from './prisma/prisma.service';
import { UsersResolver } from './users/users.resolver';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { PostsResolver } from './posts/posts.resolver';
import { join } from 'path';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    HealthModule,
    MembersModule,
    UsersModule,
    PostsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    RecipesModule,
  ],
  controllers: [],
  providers: [PrismaService, UsersResolver, PostsResolver],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
