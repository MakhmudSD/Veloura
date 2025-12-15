import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from '../../entities/Like.entity';
import { LikeService } from './like.service';
import { LikeResolver } from './like.resolver';

@Module({
	imports: [TypeOrmModule.forFeature([Like])],
	providers: [LikeService, LikeResolver],
	exports: [LikeService],
})
export class LikeModule {}

