import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from '../../entities/Notice.entity';
import { NoticeService } from './notice.service';
import { NoticeResolver } from './notice.resolver';
import { MemberModule } from '../member/member.module';

@Module({
	imports: [TypeOrmModule.forFeature([Notice]), MemberModule],
	providers: [NoticeService, NoticeResolver],
	exports: [NoticeService],
})
export class NoticeModule {}

