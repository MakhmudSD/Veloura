import { ObjectType, Field } from '@nestjs/graphql';
import { ViewGroup } from '../../enums/view.enum';

@ObjectType()
export class View {
	@Field()
	_id: string;

	@Field(() => ViewGroup)
	viewGroup: ViewGroup;

	@Field()
	memberId: string;

	@Field()
	viewRefId: string;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;
}

