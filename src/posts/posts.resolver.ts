import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaProvider } from '../prisma/prisma.provider';

import { Post } from './entities/post.entity';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private prisma: PrismaProvider) {}
  @Query(() => [Post])
  async posts() {
    return this.prisma.post.findMany();
  }

  // @Mutation(() => User)
  // async createPost(
  //   @Args('title') title: string,
  //   @Args('content') content: string,
  // ) {
  //   return this.prisma.post.create({ data: { title, content } });
  // }
}
