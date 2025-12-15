import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './Order.entity';
import { Product } from './Product.entity';

@Entity('orderItems')
export class OrderItem {
	@PrimaryGeneratedColumn('uuid')
	_id: string;

	@Column()
	itemQuantity: number;

	@Column('decimal')
	itemPrice: number;

	@Column('uuid', { nullable: true })
	orderId: string;

	@ManyToOne(() => Order, (order) => order.orderItems)
	@JoinColumn({ name: 'orderId' })
	order: Order;

	@Column('uuid', { nullable: true })
	productId: string;

	@ManyToOne(() => Product)
	@JoinColumn({ name: 'productId' })
	product: Product;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}

