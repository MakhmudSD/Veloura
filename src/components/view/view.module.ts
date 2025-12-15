import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { View } from '../../entities/View.entity';
import { ViewService } from './view.service';
import { ViewResolver } from './view.resolver';

@Module({
	imports: [TypeOrmModule.forFeature([View])],
	providers: [ViewService, ViewResolver],
	exports: [ViewService],
})
export class ViewModule {}

