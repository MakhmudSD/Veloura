import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import {
	ProductStatus,
	ProductCategory,
	ProductTier,
	ProductTargetAudience,
} from '../libs/enums/products.enum';

@Entity('products')
export class Product {
	@PrimaryGeneratedColumn('uuid')
	_id: string;

	@Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.PAUSE })
	productStatus: ProductStatus;

	@Column()
	productName: string;

	@Column('decimal')
	productPrice: number;

	@Column({ type: 'enum', enum: ProductTargetAudience, default: ProductTargetAudience.UNISEX, nullable: true })
	productTargetAudience: ProductTargetAudience;

	@Column({ type: 'enum', enum: ProductTier, default: ProductTier.STANDARD, nullable: true })
	productStyle: ProductTier;

	@Column({ type: 'enum', enum: ProductCategory, default: ProductCategory.SUPPLEMENTS })
	productCategory: ProductCategory;

	@Column({ nullable: true })
	productDuration: string;

	@Column('text', { nullable: true })
	productDesc: string;

	@Column('simple-array', { default: '' })
	productImages: string[];

	@Column({ type: 'enum', enum: ProductTier, default: ProductTier.STANDARD, nullable: true })
	productTier: ProductTier;

	@Column({ default: 0 })
	productViews: number;

	@Column({ nullable: true })
	productVolumeMl: number;

	@Column({ default: 0 })
	productQuantity: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
