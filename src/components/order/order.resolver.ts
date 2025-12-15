import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from '../../libs/dto/order/order';
import { OrderInput } from '../../libs/dto/order/order.input';

@Resolver(() => Order)
export class OrderResolver {
	constructor(private readonly orderService: OrderService) {}

	@Mutation(() => Order)
	async createOrder(@Args('input') input: OrderInput): Promise<Order> {
		return this.orderService.createOrder(input);
	}

	@Query(() => [Order])
	async getOrders(@Args('memberId', { nullable: true }) memberId?: string): Promise<Order[]> {
		return this.orderService.getOrders(memberId);
	}

	@Query(() => Order)
	async getOrder(@Args('id') id: string): Promise<Order> {
		return this.orderService.getOrder(id);
	}
}

