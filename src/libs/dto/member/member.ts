import { ObjectType, Field } from '@nestjs/graphql';
import { MemberType, MemberStatus } from '../../enums/members.enum';

@ObjectType()
export class Member {
	@Field()
	_id: string;

	@Field(() => MemberType)
	memberType: MemberType;

	@Field(() => MemberStatus)
	memberStatus: MemberStatus;

	@Field()
	memberNick: string;

	@Field()
	memberPhone: string;

	@Field({ nullable: true })
	memberEmail?: string;

	@Field({ nullable: true })
	memberAddress?: string;

	@Field({ nullable: true })
	memberImage?: string;

	@Field({ nullable: true })
	memberDesc?: string;

	@Field()
	memberPoints: number;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;

	@Field({ nullable: true })
	accessToken?: string;
}

