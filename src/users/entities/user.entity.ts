import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/posts/entities/post.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;
  @Field(() => ID)
  uuid: string;
  email: string;
  name: string;
  @Field(() => [Post])
  posts: Post[];
}
