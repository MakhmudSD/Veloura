import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../entities/Order.entity';
import { OrderItem } from '../../entities/OrderItem.entity';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';

@Module({
	imports: [TypeOrmModule.forFeature([Order, OrderItem])],
	providers: [OrderService, OrderResolver],
	exports: [OrderService],
})
export class OrderModule {}

