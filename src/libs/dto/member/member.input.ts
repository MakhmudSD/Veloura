import { InputType, Field } from '@nestjs/graphql';
import { MemberType, MemberStatus } from '../../enums/members.enum';

@InputType()
export class MemberInput {
	@Field(() => MemberType, { nullable: true })
	memberType?: MemberType;

	@Field(() => MemberStatus, { nullable: true })
	memberStatus?: MemberStatus;

	@Field()
	memberNick: string;

	@Field()
	memberPhone: string;

	@Field({ nullable: true })
	memberEmail?: string;

	@Field()
	memberPassword: string;

	@Field({ nullable: true })
	memberAddress?: string;

	@Field({ nullable: true })
	memberDesc?: string;

	@Field({ nullable: true })
	memberImage?: string;

	@Field({ nullable: true })
	memberPoints?: number;
}

@InputType()
export class LoginInput {
	@Field()
	memberNick: string;

	@Field()
	memberPassword: string;
}

@InputType()
export class MemberUpdateInput {
	@Field()
	_id: string;

	@Field(() => MemberStatus, { nullable: true })
	memberStatus?: MemberStatus;

	@Field()
	memberNick: string;

	@Field()
	memberPhone: string;

	@Field({ nullable: true })
	memberEmail?: string;

	@Field({ nullable: true })
	memberPassword?: string;

	@Field({ nullable: true })
	memberAddress?: string;

	@Field({ nullable: true })
	memberDesc?: string;

	@Field({ nullable: true })
	memberImage?: string;
}

@InputType()
export class OAuthLoginInput {
	@Field()
	token: string;

	@Field()
	provider: string;
}

