import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';

/**
 * DTO cho yêu cầu thêm sản phẩm vào giỏ hàng
 */
export class AddToCartDto {
  @ApiProperty({ description: 'ID sản phẩm cần thêm vào giỏ', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  productId: number;

  @ApiProperty({ description: 'Số lượng cần thêm', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;
}

/**
 * DTO cho yêu cầu cập nhật số lượng sản phẩm trong giỏ
 * quantity = 0 sẽ xóa sản phẩm khỏi giỏ
 */
export class UpdateCartItemDto {
  @ApiProperty({ description: 'Số lượng mới (0 = xóa khỏi giỏ)', example: 3 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  quantity: number;
}

/**
 * DTO cho từng sản phẩm trong giỏ hàng (dùng trong response)
 */
export class CartItemDto {
  @ApiProperty({ description: 'ID sản phẩm', example: 1 })
  productId: number;

  @ApiProperty({ description: 'Tên sản phẩm', example: 'iPhone 15 Pro' })
  productName: string;

  @ApiProperty({ description: 'Giá sản phẩm', example: 29990000 })
  price: number;

  @ApiProperty({ description: 'Số lượng trong giỏ', example: 2 })
  quantity: number;

  @ApiProperty({ description: 'Thành tiền (price × quantity)', example: 59980000 })
  total: number;
}

/**
 * DTO cho response giỏ hàng đầy đủ
 */
export class CartResponseDto {
  @ApiProperty({ description: 'Danh sách sản phẩm trong giỏ', type: [CartItemDto] })
  items: CartItemDto[];

  @ApiProperty({ description: 'Tổng tiền toàn giỏ hàng', example: 59980000 })
  totalPrice: number;

  @ApiProperty({ description: 'Tổng số lượng sản phẩm', example: 2 })
  itemCount: number;
}