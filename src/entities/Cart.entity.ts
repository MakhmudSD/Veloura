import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Member } from './Member.entity';
import { Product } from './Product.entity';

@Entity('carts')
@Index(['memberId', 'productId'], { unique: true })
export class Cart {
	@PrimaryGeneratedColumn('uuid')
	_id: string;

	@Column('uuid')
	memberId: string;

	@ManyToOne(() => Member)
	@JoinColumn({ name: 'memberId' })
	member: Member;

	@Column('uuid')
	productId: string;

	@ManyToOne(() => Product)
	@JoinColumn({ name: 'productId' })
	product: Product;

	@Column({ default: 1 })
	quantity: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}

