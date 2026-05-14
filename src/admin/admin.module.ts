import { Module } from '@nestjs/common';
import { AdminAuthModule } from './auth/admin-auth.module';
import { AdminCategoriesModule } from './categories/admin-categories.module';
import { AdminSuppliersModule } from './suppliers/admin-suppliers.module';
import { AdminShippersModule } from './shippers/admin-shippers.module';
import { AdminProductsModule } from './products/admin-products.module';
import { AdminProductAttributesModule } from './product-attributes/admin-product-attributes.module';

/**
 * Admin module (nhánh /api/admin/*)
 */
@Module({
  imports: [
    AdminAuthModule,
    AdminCategoriesModule,
    AdminSuppliersModule,
    AdminShippersModule,
    AdminProductsModule,
    AdminProductAttributesModule,
  ],
})
export class AdminModule {}

