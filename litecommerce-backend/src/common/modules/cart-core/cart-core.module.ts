import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { CartCoreService } from './cart-core.service';
import { MemoryCartStore } from './stores/memory-cart.store';
import { ICART_STORE } from './interfaces/cart-store.interface';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [
        CartCoreService,
        {
            provide: ICART_STORE,
            useClass: MemoryCartStore,
        },
    ],
    exports: [CartCoreService],
})
export class CartCoreModule { }
