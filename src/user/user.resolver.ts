import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';

import { User } from './user';

@Resolver(() => User)
export class UserResolver {
  constructor(private prisma: PrismaService) {}
  @Query(() => [User])
  async users() {
    return this.prisma.user.findMany();
  }

  // @Mutation(() => User)
  // async createPost(
  //   @Args('title') title: string,
  //   @Args('content') content: string,
  // ) {
  //   return this.prisma.post.create({ data: { title, content } });
  // }
}
