import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PrismaProvider } from '../prisma/prisma.provider';

import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private prisma: PrismaProvider) {}
  @Query(() => [Post])
  async getPosts() {
    return this.prisma.post.findMany();
  }
  @Query(() => Post, { nullable: true })
  async getPost(@Args('id', { type: () => Int }) id: number) {
    return this.prisma.post.findUnique({
      where: { id: id },
    });
  }
  @ResolveField(() => User, { nullable: false })
  async user(@Parent() post: Post) {
    return await this.prisma.user.findUnique({
      where: { id: post.userId },
    });
  }

  // @Mutation(() => User)
  // async createPost(
  //   @Args('title') title: string,
  //   @Args('content') content: string,
  // ) {
  //   return this.prisma.post.create({ data: { title, content } });
  // }
}
