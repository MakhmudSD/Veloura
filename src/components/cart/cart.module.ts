import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../../entities/Cart.entity';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';

@Module({
	imports: [TypeOrmModule.forFeature([Cart])],
	providers: [CartService, CartResolver],
	exports: [CartService],
})
export class CartModule {}

