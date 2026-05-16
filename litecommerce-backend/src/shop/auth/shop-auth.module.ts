import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Customer } from '../../common/entities/customer.entity';
import { ShopAuthService } from './shop-auth.service';
import { ShopAuthController } from './shop-auth.controller';

/**
 * Module authentication cho khách hàng
 * Cung cấp service và controller cho đăng nhập, đăng ký
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
  ],
  controllers: [ShopAuthController],
  providers: [ShopAuthService],
  exports: [ShopAuthService],
})
export class ShopAuthModule {}