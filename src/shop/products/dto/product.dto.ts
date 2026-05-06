import { IsString, IsNumber, IsOptional, IsBoolean, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO cho tìm kiếm và lọc sản phẩm
 */
export class ProductSearchDto {
  /**
   * Tên sản phẩm cần tìm kiếm
   */
  @ApiPropertyOptional({ example: 'iPhone' })
  @IsOptional()
  @IsString()
  search?: string;

  /**
   * ID danh mục để lọc
   */
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  /**
   * Giá tối thiểu
   */
  @ApiPropertyOptional({ example: 1000000 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  /**
   * Giá tối đa
   */
  @ApiPropertyOptional({ example: 50000000 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  /**
   * Trang hiện tại
   */
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  /**
   * Số lượng item mỗi trang
   */
  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
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
