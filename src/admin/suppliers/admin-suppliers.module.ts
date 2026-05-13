import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from '../../common/entities/supplier.entity';
import { AdminSuppliersController } from './admin-suppliers.controller';
import { AdminSuppliersService } from './admin-suppliers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier])],
  controllers: [AdminSuppliersController],
  providers: [AdminSuppliersService],
  exports: [AdminSuppliersService],
})
export class AdminSuppliersModule {}

