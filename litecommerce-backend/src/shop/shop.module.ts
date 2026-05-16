import { Module } from '@nestjs/common';
import { ShopAuthModule } from './auth/shop-auth.module';
import { ShopOrdersModule } from './orders/shop-orders.module';
import { ShopProductsModule } from './products/shop-products.module';
import { ShopCartModule } from './cart/shop-cart.module';

/**
 * Module chính cho Shop functionality
 * Bao gồm tất cả các module con của shop
 */
@Module({
  imports: [
    // Import các module con của shop
    ShopAuthModule,
    ShopProductsModule,
    ShopOrdersModule,
    ShopCartModule,
  ],
  exports: [
    // Export các module con để sử dụng ở nơi khác
    ShopAuthModule,
    ShopProductsModule,
    ShopOrdersModule,
    ShopCartModule,
  ],
})
export class ShopModule {}
