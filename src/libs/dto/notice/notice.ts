import { ObjectType, Field, Int } from '@nestjs/graphql';
import { NoticeStatus } from '../../enums/notice.enum';

@ObjectType()
export class Notice {
	@Field()
	_id: string;

	@Field(() => NoticeStatus)
	noticeStatus: NoticeStatus;

	@Field()
	noticeTitle: string;

	@Field()
	noticeContent: string;

	@Field()
	memberId: string;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;
}

@ObjectType()
export class TotalCounter {
	@Field(() => Int)
	total: number;
}

@ObjectType()
export class Notices {
	@Field(() => [Notice])
	list: Notice[];

	@Field(() => [TotalCounter], { nullable: true })
	metaCounter: TotalCounter[];
}

