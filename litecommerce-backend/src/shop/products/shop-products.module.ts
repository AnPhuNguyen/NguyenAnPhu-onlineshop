import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../common/entities/product.entity';
import { Category } from '../../common/entities/category.entity';
import { Supplier } from '../../common/entities/supplier.entity';
import { ShopProductsService } from './shop-products.service';
import { ShopProductsController } from './shop-products.controller';

/**
 * Module sản phẩm cho khách hàng
 * Cung cấp service và controller cho việc xem sản phẩm
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Supplier]),
  ],
  controllers: [ShopProductsController],
  providers: [ShopProductsService],
  exports: [ShopProductsService],
})
export class ShopProductsModule {}
