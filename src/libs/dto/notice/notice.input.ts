import { InputType, Field, Int } from '@nestjs/graphql';
import { NoticeStatus } from '../../enums/notice.enum';

@InputType()
class NoticeSearch {
	@Field(() => NoticeStatus, { nullable: true })
	noticeStatus?: NoticeStatus;

	@Field({ nullable: true })
	text?: string;
}

@InputType()
export class NoticeInquiry {
	@Field(() => Int)
	page: number;

	@Field(() => Int)
	limit: number;

	@Field({ nullable: true })
	sort?: string;

	@Field({ nullable: true })
	direction?: string;

	@Field(() => NoticeSearch)
	search: NoticeSearch;
}

@InputType()
export class NoticeInput {
	@Field(() => NoticeStatus, { nullable: true })
	noticeStatus?: NoticeStatus;

	@Field()
	noticeTitle: string;

	@Field()
	noticeContent: string;

	@Field()
	memberId: string;
}

@InputType()
export class NoticeUpdateInput {
	@Field()
	_id: string;

	@Field(() => NoticeStatus, { nullable: true })
	noticeStatus?: NoticeStatus;

	@Field({ nullable: true })
	noticeTitle?: string;

	@Field({ nullable: true })
	noticeContent?: string;
}

