import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { VALIDATION_MESSAGES } from '../../../common/constants/messages';

/**
 * DTO query cho tìm kiếm/ lọc products (admin)
 * Giống ProductSearchDto của shop + thêm supplierId
 */
export class AdminProductQueryDto {
  @ApiPropertyOptional({ example: 'iPhone' })
  @IsOptional()
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  search?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber({}, { message: VALIDATION_MESSAGES.INVALID_NUMBER })
  @Type(() => Number)
  categoryId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber({}, { message: VALIDATION_MESSAGES.INVALID_NUMBER })
  @Type(() => Number)
  supplierId?: number;

  @ApiPropertyOptional({ example: 1000000 })
  @IsOptional()
  @IsNumber({}, { message: VALIDATION_MESSAGES.INVALID_NUMBER })
  @Min(0, { message: VALIDATION_MESSAGES.MIN_VALUE(0) })
  @Type(() => Number)
  minPrice?: number;

  @ApiPropertyOptional({ example: 50000000 })
  @IsOptional()
  @IsNumber({}, { message: VALIDATION_MESSAGES.INVALID_NUMBER })
  @Min(0, { message: VALIDATION_MESSAGES.MIN_VALUE(0) })
  @Type(() => Number)
  maxPrice?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber({}, { message: VALIDATION_MESSAGES.INVALID_NUMBER })
  @Min(1, { message: VALIDATION_MESSAGES.MIN_VALUE(1) })
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumber({}, { message: VALIDATION_MESSAGES.INVALID_NUMBER })
  @Min(1, { message: VALIDATION_MESSAGES.MIN_VALUE(1) })
  @Max(100, { message: VALIDATION_MESSAGES.MAX_VALUE(100) })
  @Type(() => Number)
  limit?: number;
}
