import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NoticeService } from './notice.service';
import { Notice, Notices } from '../../libs/dto/notice/notice';
import { NoticeInput, NoticeInquiry, NoticeUpdateInput } from '../../libs/dto/notice/notice.input';

@Resolver(() => Notice)
export class NoticeResolver {
	constructor(private readonly noticeService: NoticeService) {}

	@Mutation(() => Notice)
	async createNotice(@Args('input') input: NoticeInput): Promise<Notice> {
		return this.noticeService.createNotice(input);
	}

	@Query(() => Notices)
	async getNotices(@Args('input') input: NoticeInquiry): Promise<Notices> {
		return this.noticeService.getNotices(input);
	}

	@Query(() => Notice)
	async getNotice(@Args('id') id: string): Promise<Notice> {
		return this.noticeService.getNotice(id);
	}

	@Mutation(() => Notice)
	async updateNotice(@Args('id') id: string, @Args('input') input: NoticeUpdateInput): Promise<Notice> {
		return this.noticeService.updateNotice(id, input);
	}

	@Mutation(() => Notice)
	async deleteNotice(@Args('id') id: string): Promise<Notice> {
		return this.noticeService.deleteNotice(id);
	}
}

