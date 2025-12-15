import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { View } from '../../entities/View.entity';
import { ViewGroup } from '../../libs/enums/view.enum';

@Injectable()
export class ViewService {
	constructor(@InjectRepository(View) private viewRepository: Repository<View>) {}

	async checkViewExistence(memberId: string, viewRefId: string): Promise<boolean> {
		const view = await this.viewRepository.findOne({
			where: { memberId, viewRefId },
		});
		return !!view;
	}

	async insertMemberView(memberId: string, viewRefId: string, viewGroup: ViewGroup): Promise<View> {
		const view = this.viewRepository.create({ memberId, viewRefId, viewGroup });
		return this.viewRepository.save(view);
	}
}

