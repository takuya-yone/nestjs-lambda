import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: number;
  title: string;
  content: string;
  published: boolean;
  @Field(() => User)
  user: User;
  @Field(() => ID)
  userId: number;
}
