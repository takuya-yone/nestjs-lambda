import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  controllers: [],
  providers: [PrismaService, PostsResolver, PostsService],
})
export class PostsModule {}
