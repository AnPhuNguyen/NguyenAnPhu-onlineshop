import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../entities/order.entity';
import { OrderDetail } from '../../entities/order-detail.entity';
import { Product } from '../../entities/product.entity';
import { OrderCoreService } from './order-core.service';
import { OrderStateMachine } from './order-state-machine';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([Order, OrderDetail, Product]),
    ],
    providers: [OrderCoreService, OrderStateMachine],
    exports: [OrderCoreService, OrderStateMachine],
})
export class OrderCoreModule { }
