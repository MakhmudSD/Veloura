import { ObjectType, Field } from '@nestjs/graphql';
import { Product } from '../product/product';

@ObjectType()
export class Cart {
	@Field()
	_id: string;

	@Field()
	memberId: string;

	@Field()
	productId: string;

	@Field(() => Product, { nullable: true })
	product?: Product;

	@Field(() => Number)
	quantity: number;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;
}

