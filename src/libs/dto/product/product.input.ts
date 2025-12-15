import { InputType, Field, Int } from '@nestjs/graphql';
import { ProductCategory, ProductStatus, ProductTier, ProductTargetAudience } from '../../enums/products.enum';

@InputType()
export class ProductInquiry {
	@Field({ nullable: true })
	order?: string;

	@Field(() => Int)
	page: number;

	@Field(() => Int)
	limit: number;

	@Field(() => ProductCategory, { nullable: true })
	productCategory?: ProductCategory;

	@Field(() => ProductTargetAudience, { nullable: true })
	productGender?: ProductTargetAudience;

	@Field({ nullable: true })
	search?: string;
}

@InputType()
export class ProductInput {
	@Field(() => ProductStatus, { nullable: true })
	productStatus?: ProductStatus;

	@Field(() => ProductCategory)
	productCategory: ProductCategory;

	@Field()
	productName: string;

	@Field(() => Int)
	productPrice: number;

	@Field(() => ProductTier, { nullable: true })
	productTier?: ProductTier;

	@Field(() => Int, { nullable: true })
	productQuantity?: number;

	@Field({ nullable: true })
	productDesc?: string;

	@Field(() => [String])
	productImages: string[];

	@Field(() => Int, { nullable: true })
	productViews?: number;

	@Field(() => Int, { nullable: true })
	productVolumeMl?: number;

	@Field(() => ProductTargetAudience, { nullable: true })
	productTargetAudience?: ProductTargetAudience;
}

@InputType()
export class ProductUpdateInput {
	@Field()
	_id: string;

	@Field(() => ProductStatus, { nullable: true })
	productStatus?: ProductStatus;

	@Field(() => ProductCategory, { nullable: true })
	productCategory?: ProductCategory;

	@Field({ nullable: true })
	productName?: string;

	@Field(() => Int, { nullable: true })
	productPrice?: number;

	@Field(() => ProductTier, { nullable: true })
	productTier?: ProductTier;

	@Field(() => Int, { nullable: true })
	productQuantity?: number;

	@Field({ nullable: true })
	productDesc?: string;

	@Field(() => [String], { nullable: true })
	productImages?: string[];

	@Field(() => Int, { nullable: true })
	productViews?: number;

	@Field(() => Int, { nullable: true })
	productVolumeMl?: number;

	@Field(() => ProductTargetAudience, { nullable: true })
	productTargetAudience?: ProductTargetAudience;
}

