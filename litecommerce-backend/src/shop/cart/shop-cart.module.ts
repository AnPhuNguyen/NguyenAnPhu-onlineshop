import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopCartController } from './shop-cart.controller';
import { ShopCartService } from './shop-cart.service';
import { Product } from '../../common/entities/product.entity';

/**
 * Module quản lý giỏ hàng cho khách hàng
 * Giỏ hàng lưu trong bộ nhớ (in-memory) nên không cần entity Cart
 * Chỉ cần Product để lấy thông tin tên, giá khi trả về response
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ShopCartController],
  providers: [ShopCartService],
  exports: [ShopCartService], // export để ShopOrdersService dùng clearCart() sau khi tạo đơn
})
export class ShopCartModule {}