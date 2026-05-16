import { Module } from '@nestjs/common';
import { AdminAuthModule } from './auth/admin-auth.module';
import { AdminCategoriesModule } from './categories/admin-categories.module';
import { AdminSuppliersModule } from './suppliers/admin-suppliers.module';
import { AdminShippersModule } from './shippers/admin-shippers.module';
import { AdminProductsModule } from './products/admin-products.module';
import { AdminProductAttributesModule } from './product-attributes/admin-product-attributes.module';
import { AdminEmployeesModule } from './employees/admin-employees.module';
import { AdminCustomersModule } from './customers/admin-customers.module';
import { AdminCartModule } from './cart/admin-cart.module';
import { AdminOrdersModule } from './orders/admin-orders.module';

/**
 * Admin module (nhánh /api/admin/*)
 */
@Module({
  imports: [
    AdminAuthModule,
    AdminCategoriesModule,
    AdminSuppliersModule,
    AdminShippersModule,
    AdminEmployeesModule,
    AdminCustomersModule,
    AdminProductsModule,
    AdminProductAttributesModule,
    AdminCartModule,
    AdminOrdersModule,
  ],
})
export class AdminModule {}

