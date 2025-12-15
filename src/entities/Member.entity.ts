import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { MemberStatus, MemberType } from '../libs/enums/members.enum';

@Entity('members')
export class Member {
	@PrimaryGeneratedColumn('uuid')
	_id: string;

	@Column({ type: 'enum', enum: MemberType, default: MemberType.USER })
	memberType: MemberType;

	@Column({ type: 'enum', enum: MemberStatus, default: MemberStatus.ACTIVE })
	memberStatus: MemberStatus;

	@Column({ unique: true, nullable: true })
	memberNick: string;

	@Column({ unique: true, nullable: true })
	memberPhone: string;

	@Column({ nullable: true })
	memberEmail: string;

	@Column({ select: false })
	memberPassword: string;

	@Column({ nullable: true })
	memberAddress: string;

	@Column({ nullable: true })
	memberImage: string;

	@Column({ nullable: true })
	memberDesc: string;

	@Column({ default: 0 })
	memberPoints: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
