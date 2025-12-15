import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { Like } from '../../libs/dto/like/like';
import { LikeInput } from '../../libs/dto/like/like.input';
import { LikeResponse } from '../../libs/dto/like/like.response';

@Resolver(() => Like)
export class LikeResolver {
	constructor(private readonly likeService: LikeService) {}

	@Mutation(() => LikeResponse)
	async toggleLike(@Args('input') input: LikeInput): Promise<LikeResponse> {
		return this.likeService.toggleLike(input.memberId, input.productId);
	}

	@Query(() => [Like])
	async getLikes(@Args('memberId') memberId: string): Promise<Like[]> {
		return this.likeService.getLikes(memberId);
	}

	@Query(() => Boolean)
	async checkLike(@Args('memberId') memberId: string, @Args('productId') productId: string): Promise<boolean> {
		return this.likeService.checkLike(memberId, productId);
	}

	@Query(() => Number)
	async getProductLikeCount(@Args('productId') productId: string): Promise<number> {
		return this.likeService.getProductLikeCount(productId);
	}
}

