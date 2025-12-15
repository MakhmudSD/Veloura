import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../../entities/Member.entity';
import { MemberService } from './member.service';
import { MemberResolver } from './member.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [TypeOrmModule.forFeature([Member]), AuthModule],
	providers: [MemberService, MemberResolver],
	exports: [MemberService],
})
export class MemberModule {}

