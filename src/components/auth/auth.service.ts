import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Member } from '../../entities/Member.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) {}

	async hashPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt();
		return bcrypt.hash(password, salt);
	}

	async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
		return bcrypt.compare(password, hashedPassword);
	}

	async createToken(member: Member): Promise<string> {
		const payload = {
			_id: member._id,
			memberNick: member.memberNick,
			memberType: member.memberType,
		};
		return this.jwtService.sign(payload, {
			secret: process.env.SECRET_TOKEN || 'default-secret',
			expiresIn: process.env.AUTH_TIMER || '24h',
		});
	}

	async verifyToken(token: string): Promise<any> {
		return this.jwtService.verify(token, {
			secret: process.env.SECRET_TOKEN || 'default-secret',
		});
	}
}

