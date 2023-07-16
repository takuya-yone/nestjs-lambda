import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';

import { User } from './entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => User)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  @Query(() => [User])
  async users() {
    return this.prisma.user.findMany();
  }

  @ResolveField(() => [Post])
  async posts(@Parent() user: User) {
    return await this.prisma.post.findMany({
      where: { userId: user.id },
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
