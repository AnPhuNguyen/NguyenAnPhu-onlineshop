import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipper } from '../../common/entities/shipper.entity';
import { AdminShippersController } from './admin-shippers.controller';
import { AdminShippersService } from './admin-shippers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shipper])],
  controllers: [AdminShippersController],
  providers: [AdminShippersService],
  exports: [AdminShippersService],
})
export class AdminShippersModule {}

