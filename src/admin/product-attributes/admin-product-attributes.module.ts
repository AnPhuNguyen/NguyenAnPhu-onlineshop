import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminProductAttributesController } from './admin-product-attributes.controller';
import { AdminProductAttributesService } from './admin-product-attributes.service';
import { ProductAttribute } from '../../common/entities/product-attribute.entity';
import { Product } from '../../common/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductAttribute, Product])],
  controllers: [AdminProductAttributesController],
  providers: [AdminProductAttributesService],
})
export class AdminProductAttributesModule {}
