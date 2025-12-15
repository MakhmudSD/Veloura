import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from '../../libs/dto/product/product';
import { ProductInquiry, ProductInput, ProductUpdateInput } from '../../libs/dto/product/product.input';

@Resolver(() => Product)
export class ProductResolver {
	constructor(private readonly productService: ProductService) {}

	@Query(() => [Product])
	async getProducts(@Args('input') input: ProductInquiry): Promise<Product[]> {
		return this.productService.getProducts(input);
	}

	@Query(() => Product)
	async getProduct(@Args('id') id: string): Promise<Product> {
		return this.productService.getProduct(id);
	}

	@Query(() => [Product])
	async getAllProducts(): Promise<Product[]> {
		return this.productService.getAllProducts();
	}

	@Mutation(() => Product)
	async createProduct(@Args('input') input: ProductInput): Promise<Product> {
		return this.productService.createProduct(input);
	}

	@Mutation(() => Product)
	async updateProduct(@Args('id') id: string, @Args('input') input: ProductUpdateInput): Promise<Product> {
		return this.productService.updateProduct(id, input);
	}

	@Query(() => [Product])
	async getTopProducts(@Args('limit', { nullable: true }) limit?: number): Promise<Product[]> {
		return this.productService.getTopProducts(limit || 10);
	}

	@Query(() => [Product])
	async getPopularProducts(@Args('limit', { nullable: true }) limit?: number): Promise<Product[]> {
		return this.productService.getPopularProducts(limit || 10);
	}
}

