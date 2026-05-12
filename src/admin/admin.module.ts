import { Module } from '@nestjs/common';
import { AdminAuthModule } from './auth/admin-auth.module';

/**
 * Admin module (nhánh /api/admin/*)
 */
@Module({
  imports: [AdminAuthModule],
})
export class AdminModule {}

