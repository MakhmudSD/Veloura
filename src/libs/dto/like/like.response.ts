import { ObjectType, Field } from '@nestjs/graphql';
import { Like } from './like';

@ObjectType()
export class LikeResponse {
	@Field()
	liked: boolean;

	@Field(() => Like, { nullable: true })
	like?: Like;
}

