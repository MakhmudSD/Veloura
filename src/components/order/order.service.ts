import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../entities/Order.entity';

@Injectable()
export class OrderService {
	constructor(@InjectRepository(Order) private orderRepository: Repository<Order>) {}

	async createOrder(input: any): Promise<Order> {
		return this.orderRepository.save(input);
	}

	async getOrders(memberId?: string): Promise<Order[]> {
		if (memberId) {
			return this.orderRepository.find({ where: { memberId } });
		}
		return this.orderRepository.find();
	}

	async getOrder(id: string): Promise<Order> {
		return this.orderRepository.findOne({ where: { _id: id }, relations: ['orderItems'] });
	}
}

