import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notice } from '../../entities/Notice.entity';
import { NoticeStatus } from '../../libs/enums/notice.enum';

@Injectable()
export class NoticeService {
	constructor(@InjectRepository(Notice) private noticeRepository: Repository<Notice>) {}

	async createNotice(input: any): Promise<Notice> {
		return this.noticeRepository.save(input);
	}

	async getNotices(input: any): Promise<{ list: Notice[]; metaCounter: [{ total: number }] }> {
		const queryBuilder = this.noticeRepository.createQueryBuilder('notice');

		if (input.search?.noticeStatus) {
			queryBuilder.andWhere('notice.noticeStatus = :status', { status: input.search.noticeStatus });
		}

		if (input.search?.text) {
			queryBuilder.andWhere(
				'(notice.noticeTitle ILIKE :text OR notice.noticeContent ILIKE :text)',
				{ text: `%${input.search.text}%` },
			);
		}

		const sort = input.sort || 'createdAt';
		const direction = input.direction || 'DESC';
		queryBuilder.orderBy(`notice.${sort}`, direction);

		const total = await queryBuilder.getCount();
		const list = await queryBuilder
			.skip((input.page - 1) * input.limit)
			.take(input.limit)
			.getMany();

		return { list, metaCounter: [{ total }] };
	}

	async getNotice(id: string): Promise<Notice> {
		const notice = await this.noticeRepository.findOne({
			where: { _id: id, noticeStatus: NoticeStatus.ACTIVE },
		});
		if (!notice) throw new NotFoundException('Notice not found or inactive');
		return notice;
	}

	async updateNotice(id: string, input: any): Promise<Notice> {
		await this.noticeRepository.update(id, input);
		const result = await this.noticeRepository.findOne({ where: { _id: id } });
		if (!result) throw new NotFoundException('Notice not found');
		return result;
	}

	async deleteNotice(id: string): Promise<Notice> {
		await this.noticeRepository.update(id, { noticeStatus: NoticeStatus.DELETED });
		const result = await this.noticeRepository.findOne({ where: { _id: id } });
		if (!result) throw new NotFoundException('Notice not found');
		return result;
	}
}

