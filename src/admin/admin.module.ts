import { Module } from '@nestjs/common';
import { AdminAuthModule } from './auth/admin-auth.module';
import { AdminCategoriesModule } from './categories/admin-categories.module';
import { AdminSuppliersModule } from './suppliers/admin-suppliers.module';
import { AdminShippersModule } from './shippers/admin-shippers.module';

/**
 * Admin module (nhánh /api/admin/*)
 */
@Module({
imports: [AdminAuthModule, AdminCategoriesModule, AdminSuppliersModule, AdminShippersModule],
})
export class AdminModule {}

