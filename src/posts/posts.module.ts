import { Module } from '@nestjs/common';
import { PrismaProvider } from 'src/prisma/prisma.provider';
import { PostsResolver } from './posts.resolver';

@Module({
  controllers: [],
  providers: [PrismaProvider, PostsResolver],
})
export class PostsModule {}
