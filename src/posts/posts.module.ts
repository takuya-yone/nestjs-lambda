import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsResolver } from './posts.resolver';

@Module({
  controllers: [],
  providers: [PrismaService, PostsResolver],
})
export class PostsModule {}