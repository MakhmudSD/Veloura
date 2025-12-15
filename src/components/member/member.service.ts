import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../../entities/Member.entity';
import { MemberStatus, MemberType } from '../../libs/enums/members.enum';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MemberService {
	constructor(
		@InjectRepository(Member) private memberRepository: Repository<Member>,
		private authService: AuthService,
	) {}

	async signup(input: any): Promise<Member & { accessToken: string }> {
		input.memberPassword = await this.authService.hashPassword(input.memberPassword);
		try {
			const result = await this.memberRepository.save(input);
			result.memberPassword = '';
			const accessToken = await this.authService.createToken(result);
			return { ...result, accessToken };
		} catch (err) {
			console.log('ERROR on service: signup', err);
			throw new BadRequestException('Create failed');
		}
	}

	async login(input: any): Promise<Member & { accessToken: string }> {
		const member = await this.memberRepository.findOne({
			where: { memberNick: input.memberNick },
			select: ['_id', 'memberNick', 'memberPassword', 'memberStatus', 'memberType'],
		});

		if (!member || member.memberStatus === MemberStatus.DELETE) {
			throw new UnauthorizedException('No member found');
		}

		if (member.memberStatus === MemberStatus.BLOCK) {
			throw new UnauthorizedException('Blocked user');
		}

		const isMatch = await this.authService.comparePasswords(input.memberPassword, member.memberPassword);
		if (!isMatch) {
			throw new UnauthorizedException('Wrong password');
		}

		const result = await this.memberRepository.findOne({ where: { _id: member._id } });
		const accessToken = await this.authService.createToken(result);
		return { ...result, accessToken };
	}

	async getMemberDetail(memberId: string): Promise<Member> {
		const result = await this.memberRepository.findOne({
			where: { _id: memberId, memberStatus: MemberStatus.ACTIVE },
		});
		if (!result) throw new NotFoundException('No data found');
		return result;
	}

	async updateMember(memberId: string, input: any): Promise<Member & { accessToken: string }> {
		await this.memberRepository.update(memberId, input);
		const result = await this.memberRepository.findOne({ where: { _id: memberId } });
		if (!result) throw new NotFoundException('Update failed');
		const accessToken = await this.authService.createToken(result);
		return { ...result, accessToken };
	}

	async getTopUsers(): Promise<Member[]> {
		return this.memberRepository.find({
			where: { memberStatus: MemberStatus.ACTIVE },
			order: { memberPoints: 'DESC' },
			take: 4,
		});
	}

	async addUserPoint(memberId: string, point: number): Promise<Member> {
		const member = await this.memberRepository.findOne({
			where: { _id: memberId, memberType: MemberType.USER, memberStatus: MemberStatus.ACTIVE },
		});
		if (!member) throw new NotFoundException('Member not found');
		member.memberPoints += point;
		return this.memberRepository.save(member);
	}
}

