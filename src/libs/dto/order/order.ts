import { ObjectType, Field } from '@nestjs/graphql';
import { OrderStatus } from '../../enums/orders.enum';

@ObjectType()
export class Order {
	@Field()
	_id: string;

	@Field(() => Number)
	orderTotal: number;

	@Field(() => Number)
	orderDelivery: number;

	@Field(() => OrderStatus)
	orderStatus: OrderStatus;

	@Field({ nullable: true })
	memberId?: string;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;
}

