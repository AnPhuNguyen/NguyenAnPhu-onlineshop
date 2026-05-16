import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../common/entities/product.entity';
import { AdminCartController } from './admin-cart.controller';
import { AdminCartService } from './admin-cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [AdminCartController],
  providers: [AdminCartService],
  exports: [AdminCartService],
})
export class AdminCartModule {}
