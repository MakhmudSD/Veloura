import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
	imports: [
		JwtModule.register({
			secret: process.env.SECRET_TOKEN || 'default-secret',
			signOptions: { expiresIn: process.env.AUTH_TIMER || '24h' },
		}),
	],
	providers: [AuthService],
	exports: [AuthService],
})
export class AuthModule {}

