import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CartInput {
	@Field()
	memberId: string;

	@Field()
	productId: string;

	@Field(() => Int, { nullable: true })
	quantity?: number;
}

@InputType()
export class CartUpdateInput {
	@Field()
	_id: string;

	@Field(() => Int)
	quantity: number;
}

