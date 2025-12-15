import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/Product.entity';
import { ProductStatus } from '../../libs/enums/products.enum';

@Injectable()
export class ProductService {
	constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}

	async getProducts(inquiry: any): Promise<Product[]> {
		const queryBuilder = this.productRepository.createQueryBuilder('product');
		queryBuilder.where('product.productStatus = :status', { status: ProductStatus.PROCESS });

		if (inquiry.productCategory) {
			queryBuilder.andWhere('product.productCategory = :category', { category: inquiry.productCategory });
		}

		if (inquiry.search) {
			queryBuilder.andWhere('product.productName ILIKE :search', { search: `%${inquiry.search}%` });
		}

		const order = inquiry.order || 'createdAt';
		const direction = inquiry.order === 'productPrice' ? 'ASC' : 'DESC';
		queryBuilder.orderBy(`product.${order}`, direction);

		queryBuilder.skip((inquiry.page - 1) * inquiry.limit).take(inquiry.limit);

		return queryBuilder.getMany();
	}

	async getProduct(id: string): Promise<Product> {
		const result = await this.productRepository.findOne({
			where: { _id: id, productStatus: ProductStatus.PROCESS },
		});
		if (!result) throw new NotFoundException('No data found');
		return result;
	}

	async getAllProducts(): Promise<Product[]> {
		return this.productRepository.find();
	}

	async createProduct(input: any): Promise<Product> {
		return this.productRepository.save(input);
	}

	async updateProduct(id: string, input: any): Promise<Product> {
		await this.productRepository.update(id, input);
		const result = await this.productRepository.findOne({ where: { _id: id } });
		if (!result) throw new NotFoundException('Update failed');
		return result;
	}
}

