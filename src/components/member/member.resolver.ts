import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { Member } from '../../libs/dto/member/member';
import { MemberInput, LoginInput, MemberUpdateInput, OAuthLoginInput } from '../../libs/dto/member/member.input';

@Resolver(() => Member)
export class MemberResolver {
	constructor(private readonly memberService: MemberService) {}

	@Mutation(() => Member)
	async signup(@Args('input') input: MemberInput): Promise<Member & { accessToken: string }> {
		return this.memberService.signup(input);
	}

	@Mutation(() => Member)
	async login(@Args('input') input: LoginInput): Promise<Member & { accessToken: string }> {
		return this.memberService.login(input);
	}

	@Query(() => Member)
	async getMemberDetail(@Args('id') id: string): Promise<Member> {
		return this.memberService.getMemberDetail(id);
	}

	@Mutation(() => Member)
	async updateMember(@Args('id') id: string, @Args('input') input: MemberUpdateInput): Promise<Member & { accessToken: string }> {
		return this.memberService.updateMember(id, input);
	}

	@Query(() => [Member])
	async getTopUsers(): Promise<Member[]> {
		return this.memberService.getTopUsers();
	}

	@Mutation(() => Member)
	async oauthLogin(@Args('input') input: OAuthLoginInput): Promise<Member & { accessToken: string }> {
		return this.memberService.oauthLogin(input.token, input.provider);
	}
}

