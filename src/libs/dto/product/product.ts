import { ObjectType, Field } from '@nestjs/graphql';
import { ProductStatus, ProductCategory, ProductTier, ProductTargetAudience } from '../../enums/products.enum';

@ObjectType()
export class Product {
	@Field()
	_id: string;

	@Field(() => ProductStatus)
	productStatus: ProductStatus;

	@Field()
	productName: string;

	@Field(() => Number)
	productPrice: number;

	@Field(() => ProductTargetAudience, { nullable: true })
	productTargetAudience?: ProductTargetAudience;

	@Field(() => ProductTier, { nullable: true })
	productStyle?: ProductTier;

	@Field(() => ProductCategory)
	productCategory: ProductCategory;

	@Field({ nullable: true })
	productDuration?: string;

	@Field({ nullable: true })
	productDesc?: string;

	@Field(() => [String])
	productImages: string[];

	@Field(() => ProductTier, { nullable: true })
	productTier?: ProductTier;

	@Field(() => Number)
	productViews: number;

	@Field(() => Number, { nullable: true })
	productVolumeMl?: number;

	@Field(() => Number)
	productQuantity: number;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;
}

