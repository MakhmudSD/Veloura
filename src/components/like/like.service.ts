import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '../../entities/Like.entity';

@Injectable()
export class LikeService {
	constructor(@InjectRepository(Like) private likeRepository: Repository<Like>) {}

	async toggleLike(memberId: string, productId: string): Promise<{ liked: boolean; like?: Like }> {
		const existing = await this.likeRepository.findOne({
			where: { memberId, productId },
			relations: ['product'],
		});

		if (existing) {
			await this.likeRepository.remove(existing);
			return { liked: false };
		}

		const like = this.likeRepository.create({ memberId, productId });
		const saved = await this.likeRepository.save(like);
		const withProduct = await this.likeRepository.findOne({
			where: { _id: saved._id },
			relations: ['product'],
		});
		return { liked: true, like: withProduct };
	}

	async getLikes(memberId: string): Promise<Like[]> {
		return this.likeRepository.find({
			where: { memberId },
			relations: ['product'],
		});
	}

	async checkLike(memberId: string, productId: string): Promise<boolean> {
		const like = await this.likeRepository.findOne({
			where: { memberId, productId },
		});
		return !!like;
	}

	async getProductLikeCount(productId: string): Promise<number> {
		return this.likeRepository.count({ where: { productId } });
	}
}

