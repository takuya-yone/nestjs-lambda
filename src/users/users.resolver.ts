import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';

import { PrismaProvider } from '../prisma/prisma.provider';

import { User } from './entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private prisma: PrismaProvider) {}

  @Query(() => User, { nullable: true })
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  @Query(() => [User], { nullable: true })
  async getUsers() {
    return this.prisma.user.findMany();
  }

  @Mutation((returns) => User)
  async createUser(@Args('name') name: string, @Args('email') email: string) {
    return this.prisma.user.create({
      data: {
        email: email,
        name: name,
        uuid: uuidv4(),
      },
    });
  }

  @ResolveField(() => [Post], { nullable: true })
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
