import { IsString, IsNumber, IsOptional, IsBoolean, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VALIDATION_MESSAGES } from '../../../common/constants/messages';

/**
 * DTO cho tìm kiếm và lọc sản phẩm
 */
export class ProductSearchDto {
  /**
   * Tên sản phẩm cần tìm kiếm
   */
  @ApiPropertyOptional({ example: 'iPhone' })
  @IsOptional()
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  search?: string;

  /**
   * ID danh mục để lọc
   */
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber({}, { message: VALIDATION_MESSAGES.INVALID_NUMBER })
  @Type(() => Number)
  categoryId?: number;

  /**
   * Giá tối thiểu
   */
  @ApiPropertyOptional({ example: 1000000 })
  @IsOptional()
  @IsNumber({}, { message: VALIDATION_MESSAGES.INVALID_NUMBER })
  @Min(0, { message: VALIDATION_MESSAGES.MIN_VALUE(0) })
  @Type(() => Number)
  minPrice?: number;

  /**
   * Giá tối đa
   */
  @ApiPropertyOptional({ example: 50000000 })
  @IsOptional()
  @IsNumber({}, { message: VALIDATION_MESSAGES.INVALID_NUMBER })
  @Min(0, { message: VALIDATION_MESSAGES.MIN_VALUE(0) })
  @Type(() => Number)
  maxPrice?: number;

  /**
   * Trang hiện tại
   */
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber({}, { message: VALIDATION_MESSAGES.INVALID_NUMBER })
  @Min(1, { message: VALIDATION_MESSAGES.MIN_VALUE(1) })
  @Type(() => Number)
  page?: number;

  /**
   * Số lượng item mỗi trang
   */
  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumber({}, { message: VALIDATION_MESSAGES.INVALID_NUMBER })
  @Min(1, { message: VALIDATION_MESSAGES.MIN_VALUE(1) })
  @Max(100, { message: VALIDATION_MESSAGES.MAX_VALUE(100) })
  @Type(() => Number)
  limit?: number;
}

/**
 * DTO cho chi tiết sản phẩm
 */
export class ProductDetailDto {
  /**
   * ID sản phẩm
   */
  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: VALIDATION_MESSAGES.INVALID_NUMBER })
  productId: number;

  /**
   * Tên sản phẩm
   */
  @ApiProperty({ example: 'iPhone 13 Pro' })
  productName: string;

  /**
   * Mô tả sản phẩm
   */
  @ApiProperty({ example: 'Điện thoại cao cấp' })
  productDescription: string;

  /**
   * Giá bán
   */
  @ApiProperty({ example: 25000000 })
  price: number;

  /**
   * Đơn vị tính
   */
  @ApiProperty({ example: 'cái' })
  unit: string;

  /**
   * Ảnh đại diện
   */
  @ApiProperty({ example: 'uploads/products/iphone13.jpg' })
  photo: string;

  /**
   * Trạng thái bán
   */
  @ApiProperty({ example: true })
  isSelling: boolean;

  /**
   * Danh mục
   */
  @ApiProperty({ example: { categoryId: 1, categoryName: 'Điện tử' } })
  category: any;

  /**
   * Nhà cung cấp
   */
  @ApiProperty({ example: { supplierId: 1, supplierName: 'Apple Store' } })
  supplier: any;

  /**
   * Thuộc tính sản phẩm
   */
  @ApiProperty({ example: [{ attributeName: 'Màu sắc', attributeValue: 'Xanh' }] })
  attributes: any[];

  /**
   * Ảnh sản phẩm
   */
  @ApiProperty({ example: [{ photoId: 1, photo: 'uploads/products/iphone13-1.jpg' }] })
  photos: any[];
}
