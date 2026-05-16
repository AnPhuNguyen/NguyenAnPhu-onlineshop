import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminOrdersController } from './admin-orders.controller';
import { AdminOrdersService } from './admin-orders.service';
import { Order } from '../../common/entities/order.entity';
import { OrderDetail } from '../../common/entities/order-detail.entity';
import { Product } from '../../common/entities/product.entity';
import { Customer } from '../../common/entities/customer.entity';
import { Employee } from '../../common/entities/employee.entity';
import { Shipper } from '../../common/entities/shipper.entity';
import { Province } from '../../common/entities/province.entity';
import { AdminCartModule } from '../cart/admin-cart.module';

@Module({
  imports: [
    AdminCartModule,
    TypeOrmModule.forFeature([Order, OrderDetail, Product, Customer, Employee, Shipper, Province]),
  ],
  controllers: [AdminOrdersController],
  providers: [AdminOrdersService],
})
export class AdminOrdersModule { }
