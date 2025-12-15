import { InputType, Field } from '@nestjs/graphql';
import { ViewGroup } from '../../enums/view.enum';

@InputType()
export class ViewInput {
	@Field()
	memberId: string;

	@Field()
	viewRefId: string;

	@Field(() => ViewGroup)
	viewGroup: ViewGroup;
}

