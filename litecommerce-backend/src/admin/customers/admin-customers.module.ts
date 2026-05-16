import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../../common/entities/customer.entity';
import { Province } from '../../common/entities/province.entity';
import { AdminCustomersController } from './admin-customers.controller';
import { AdminCustomersService } from './admin-customers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Province])],
  controllers: [AdminCustomersController],
  providers: [AdminCustomersService],
  exports: [AdminCustomersService],
})
export class AdminCustomersModule { }
