import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../common/entities/order.entity';
import { OrderDetail } from '../../common/entities/order-detail.entity';
import { Product } from '../../common/entities/product.entity';
import { Customer } from '../../common/entities/customer.entity';
import { Province } from '../../common/entities/province.entity';
import { ShopOrdersService } from './shop-orders.service';
import { ShopOrdersController } from './shop-orders.controller';

/**
 * Module đơn hàng cho khách hàng
 * Cung cấp service và controller cho việc quản lý đơn hàng
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail, Product, Customer, Province]),
  ],
  controllers: [ShopOrdersController],
  providers: [ShopOrdersService],
  exports: [ShopOrdersService],
})
export class ShopOrdersModule { }
