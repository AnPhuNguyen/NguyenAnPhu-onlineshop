import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../common/entities/product.entity';
import { Category } from '../../common/entities/category.entity';
import { Supplier } from '../../common/entities/supplier.entity';
import { ProductAttribute } from '../../common/entities/product-attribute.entity';
import { ProductPhoto } from '../../common/entities/product-photo.entity';
import { AdminProductsController } from './admin-products.controller';
import { AdminProductsService } from './admin-products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Category,
      Supplier,
      ProductAttribute,
      ProductPhoto,
    ]),
  ],
  controllers: [AdminProductsController],
  providers: [AdminProductsService],
})
export class AdminProductsModule {}
