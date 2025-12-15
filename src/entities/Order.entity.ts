import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { OrderStatus } from '../libs/enums/orders.enum';
import { Member } from './Member.entity';
import { OrderItem } from './OrderItem.entity';

@Entity('orders')
export class Order {
	@PrimaryGeneratedColumn('uuid')
	_id: string;

	@Column('decimal')
	orderTotal: number;

	@Column('decimal')
	orderDelivery: number;

	@Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PAUSE })
	orderStatus: OrderStatus;

	@Column('uuid', { nullable: true })
	memberId: string;

	@ManyToOne(() => Member)
	@JoinColumn({ name: 'memberId' })
	member: Member;

	@OneToMany(() => OrderItem, (orderItem) => orderItem.order)
	orderItems: OrderItem[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}

