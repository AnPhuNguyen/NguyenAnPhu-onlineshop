import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { VALIDATION_MESSAGES } from '../../../common/constants/messages';

export class CreateProductAttributeDto {
  @ApiProperty({ example: 1 })
  @IsInt({ message: VALIDATION_MESSAGES.INVALID_NUMBER })
  @Type(() => Number)
  productId: number;

  @ApiProperty({ example: 'Màu sắc' })
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  attributeName: string;

  @ApiProperty({ example: 'Đen' })
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  attributeValue: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt({ message: VALIDATION_MESSAGES.INVALID_NUMBER })
  @Min(0, { message: VALIDATION_MESSAGES.MIN_VALUE(0) })
  @Type(() => Number)
  displayOrder?: number;
}
