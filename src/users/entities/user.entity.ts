import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/posts/entities/post.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;
  email: string;
  name: string;
  @Field(() => [Post])
  posts: Post[];
}
