import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { View } from '../../entities/View.entity';
import { ViewService } from './view.service';

@Module({
	imports: [TypeOrmModule.forFeature([View])],
	providers: [ViewService],
	exports: [ViewService],
})
export class ViewModule {}

