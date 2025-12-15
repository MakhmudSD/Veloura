import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LikeInput {
	@Field()
	memberId: string;

	@Field()
	productId: string;
}

