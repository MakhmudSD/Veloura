import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { Cart } from '../../libs/dto/cart/cart';
import { CartInput, CartUpdateInput } from '../../libs/dto/cart/cart.input';

@Resolver(() => Cart)
export class CartResolver {
	constructor(private readonly cartService: CartService) {}

	@Mutation(() => Cart)
	async addToCart(@Args('input') input: CartInput): Promise<Cart> {
		return this.cartService.addToCart(input);
	}

	@Query(() => [Cart])
	async getCart(@Args('memberId') memberId: string): Promise<Cart[]> {
		return this.cartService.getCart(memberId);
	}

	@Mutation(() => Cart)
	async updateCart(@Args('input') input: CartUpdateInput): Promise<Cart> {
		return this.cartService.updateCart(input._id, input.quantity);
	}

	@Mutation(() => Cart)
	async removeFromCart(@Args('id') id: string): Promise<Cart> {
		return this.cartService.removeFromCart(id);
	}

	@Mutation(() => Boolean)
	async clearCart(@Args('memberId') memberId: string): Promise<boolean> {
		return this.cartService.clearCart(memberId);
	}
}

