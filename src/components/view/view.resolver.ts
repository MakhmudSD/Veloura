import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { BadRequestException } from '@nestjs/common';
import { ViewService } from './view.service';
import { View } from '../../libs/dto/view/view';
import { ViewInput } from '../../libs/dto/view/view.input';

@Resolver(() => View)
export class ViewResolver {
	constructor(private readonly viewService: ViewService) {}

	@Mutation(() => View)
	async trackView(@Args('input') input: ViewInput): Promise<View> {
		const exists = await this.viewService.checkViewExistence(input.memberId, input.viewRefId);
		if (exists) {
			throw new BadRequestException('View already tracked');
		}
		return this.viewService.insertMemberView(input.memberId, input.viewRefId, input.viewGroup);
	}
}

