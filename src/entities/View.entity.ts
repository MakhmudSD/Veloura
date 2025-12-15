import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { ViewGroup } from '../libs/enums/view.enum';
import { Member } from './Member.entity';

@Entity('views')
@Index(['memberId', 'viewRefId'], { unique: true })
export class View {
	@PrimaryGeneratedColumn('uuid')
	_id: string;

	@Column({ type: 'enum', enum: ViewGroup })
	viewGroup: ViewGroup;

	@Column('uuid')
	memberId: string;

	@ManyToOne(() => Member)
	@JoinColumn({ name: 'memberId' })
	member: Member;

	@Column('uuid')
	viewRefId: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}

