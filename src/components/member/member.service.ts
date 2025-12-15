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

	async oauthLogin(token: string, provider: string): Promise<Member & { accessToken: string }> {
		let userInfo: any;

		if (provider === 'google') {
			userInfo = await this.verifyGoogleToken(token);
		} else if (provider === 'kakao') {
			userInfo = await this.verifyKakaoToken(token);
		} else {
			throw new BadRequestException('Invalid provider');
		}

		const email = userInfo.email || `${userInfo.id}@${provider}.com`;
		let member = await this.memberRepository.findOne({
			where: { memberEmail: email },
		});

		if (!member) {
			member = this.memberRepository.create({
				memberEmail: email,
				memberNick: userInfo.name || userInfo.nickname || `user_${userInfo.id}`,
				memberImage: userInfo.picture || userInfo.profile_image,
				memberType: MemberType.USER,
				memberStatus: MemberStatus.ACTIVE,
			});
			member = await this.memberRepository.save(member);
		}

		const accessToken = await this.authService.createToken(member);
		return { ...member, accessToken };
	}

	private async verifyGoogleToken(token: string): Promise<any> {
		try {
			const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
			if (!response.ok) throw new Error('Invalid token');
			return await response.json();
		} catch (error) {
			throw new UnauthorizedException('Invalid Google token');
		}
	}

	private async verifyKakaoToken(token: string): Promise<any> {
		try {
			const response = await fetch('https://kapi.kakao.com/v2/user/me', {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (!response.ok) throw new Error('Invalid token');
			const data = await response.json();
			return {
				id: data.id,
				email: data.kakao_account?.email,
				name: data.kakao_account?.profile?.nickname,
				nickname: data.kakao_account?.profile?.nickname,
				picture: data.kakao_account?.profile?.profile_image_url,
				profile_image: data.kakao_account?.profile?.profile_image_url,
			};
		} catch (error) {
			throw new UnauthorizedException('Invalid Kakao token');
		}
	}
}

