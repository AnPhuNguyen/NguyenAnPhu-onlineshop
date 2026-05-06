import { IsString, IsNumber, IsNotEmpty, IsOptional, Min, Max, ArrayNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO cho chi tiết sản phẩm trong đơn hàng
 */
export class OrderItemDto {
  /**
   * ID sản phẩm
   */
  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(1)
  productId: number;

  /**
   * Số lượng
   */
  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(1)
  quantity: number;
}

/**
 * DTO cho tạo đơn hàng mới
 */
export class CreateOrderDto {
  /**
   * Danh sách sản phẩm trong đơn hàng
   */
  @ApiProperty({ example: [{ productId: 1, quantity: 2 }] })
  @ArrayNotEmpty()
  @IsNotEmpty()
  items: OrderItemDto[];

  /**
   * Tỉnh giao hàng
   */
  @ApiPropertyOptional({ example: 'Hà Nội' })
  @IsOptional()
  @IsString()
  deliveryProvince?: string;

  /**
   * Địa chỉ giao hàng
   */
  @ApiPropertyOptional({ example: '123 Đường ABC, Quận 1' })
  @IsOptional()
  @IsString()
  deliveryAddress?: string;
}

/**
 * DTO cho chi tiết đơn hàng
 */
export class OrderDetailDto {
  /**
   * ID đơn hàng
   */
  @ApiProperty({ example: 1 })
  orderId: number;

  /**
   * Thời điểm tạo đơn hàng
   */
  @ApiProperty({ example: '2024-01-01T10:00:00Z' })
  orderTime: Date;

  /**
   * Trạng thái đơn hàng
   */
  @ApiProperty({ example: 1 })
  status: number;

  /**
   * Mô tả trạng thái
   */
  @ApiProperty({ example: 'Đơn hàng vừa gửi/khởi tạo' })
  statusDescription: string;

  /**
   * Địa chỉ giao hàng
   */
  @ApiProperty({ example: '123 Đường ABC, Quận 1, Hà Nội' })
  deliveryAddress: string;

  /**
   * Tỉnh giao hàng
   */
  @ApiProperty({ example: 'Hà Nội' })
  deliveryProvince: string;

  /**
   * Tổng giá trị đơn hàng
   */
  @ApiProperty({ example: 50000000 })
  totalAmount: number;

  /**
   * Chi tiết các sản phẩm trong đơn hàng
   */
  @ApiProperty({ example: [{ productId: 1, productName: 'iPhone', quantity: 2, salePrice: 25000000 }] })
  orderDetails: any[];
}

/**
 * DTO cho lọc đơn hàng
 */
export class OrderSearchDto {
  /**
   * Trạng thái đơn hàng để lọc
   */
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  status?: number;

  /**
   * Trang hiện tại
   */
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  /**
   * Số lượng mỗi trang
   */
  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;
}
