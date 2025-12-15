import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { NoticeStatus } from '../libs/enums/notice.enum';
import { Member } from './Member.entity';

@Entity('notices')
export class Notice {
	@PrimaryGeneratedColumn('uuid')
	_id: string;

	@Column({ type: 'enum', enum: NoticeStatus, default: NoticeStatus.ACTIVE })
	noticeStatus: NoticeStatus;

	@Column()
	noticeTitle: string;

	@Column('text')
	noticeContent: string;

	@Column('uuid')
	memberId: string;

	@ManyToOne(() => Member)
	@JoinColumn({ name: 'memberId' })
	member: Member;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}

