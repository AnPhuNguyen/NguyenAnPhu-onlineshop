import { IsOptional, IsNumber, Min, Max, IsArray, ArrayNotEmpty, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VALIDATION_MESSAGES } from '../../../common/constants/messages';

export class OrderItemAdminDto {
  @ApiProperty({ example: 1 })
  @IsInt({ message: VALIDATION_MESSAGES.INVALID_NUMBER })
  @Min(1, { message: VALIDATION_MESSAGES.MIN_VALUE(1) })
  productId: number;

  @ApiProperty({ example: 2 })
  @IsInt({ message: VALIDATION_MESSAGES.INVALID_NUMBER })
  @Min(1, { message: VALIDATION_MESSAGES.MIN_VALUE(1) })
  quantity: number;
}

export class AdminCreateOrderDto {
  /**
   * items lấy từ admin cart
   */
  @ApiProperty({ example: [{ productId: 1, quantity: 2 }] })
  @IsArray({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @ArrayNotEmpty({ message: 'Danh sách sản phẩm không được rỗng' })
  items: OrderItemAdminDto[];

  @ApiProperty({ example: 1 })
  @IsInt({ message: VALIDATION_MESSAGES.INVALID_NUMBER })
  @Min(1, { message: VALIDATION_MESSAGES.MIN_VALUE(1) })
  customerId: number;

  @ApiPropertyOptional({ example: 'Hà Nội' })
  @IsOptional()
  deliveryProvince?: string;

  @ApiPropertyOptional({ example: '123 Đường ABC, Quận 1' })
  @IsOptional()
  deliveryAddress?: string;
}

export class AdminOrderSearchDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber({}, { message: VALIDATION_MESSAGES.INVALID_NUMBER })
  @Min(1, { message: VALIDATION_MESSAGES.MIN_VALUE(1) })
  page?: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumber({}, { message: VALIDATION_MESSAGES.INVALID_NUMBER })
  @Min(1, { message: VALIDATION_MESSAGES.MIN_VALUE(1) })
  @Max(100, { message: VALIDATION_MESSAGES.MAX_VALUE(100) })
  limit?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber({}, { message: VALIDATION_MESSAGES.INVALID_NUMBER })
  status?: number;
}

export class AdminUpdateStatusDto {
  @ApiProperty({ example: 2 })
  @IsInt({ message: VALIDATION_MESSAGES.INVALID_NUMBER })
  @Min(-2, { message: 'Status không hợp lệ' })
  @Max(4, { message: 'Status không hợp lệ' })
  status: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt({ message: VALIDATION_MESSAGES.INVALID_NUMBER })
  shipperId?: number;
}
