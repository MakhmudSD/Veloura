import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Member } from './Member.entity';
import { Product } from './Product.entity';

@Entity('likes')
@Index(['memberId', 'productId'], { unique: true })
export class Like {
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

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}

