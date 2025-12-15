import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../../entities/Cart.entity';

@Injectable()
export class CartService {
	constructor(@InjectRepository(Cart) private cartRepository: Repository<Cart>) {}

	async addToCart(input: any): Promise<Cart> {
		const existing = await this.cartRepository.findOne({
			where: { memberId: input.memberId, productId: input.productId },
		});

		if (existing) {
			existing.quantity += input.quantity || 1;
			return this.cartRepository.save(existing);
		}

		const cart = this.cartRepository.create({
			memberId: input.memberId,
			productId: input.productId,
			quantity: input.quantity || 1,
		});

		return this.cartRepository.save(cart);
	}

	async getCart(memberId: string): Promise<Cart[]> {
		return this.cartRepository.find({
			where: { memberId },
			relations: ['product'],
		});
	}

	async updateCart(id: string, quantity: number): Promise<Cart> {
		const cart = await this.cartRepository.findOne({ where: { _id: id } });
		if (!cart) throw new NotFoundException('Cart item not found');

		cart.quantity = quantity;
		return this.cartRepository.save(cart);
	}

	async removeFromCart(id: string): Promise<Cart> {
		const cart = await this.cartRepository.findOne({ where: { _id: id } });
		if (!cart) throw new NotFoundException('Cart item not found');

		await this.cartRepository.remove(cart);
		return cart;
	}

	async clearCart(memberId: string): Promise<boolean> {
		await this.cartRepository.delete({ memberId });
		return true;
	}
}

