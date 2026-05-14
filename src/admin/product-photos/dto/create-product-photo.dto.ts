import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { VALIDATION_MESSAGES } from '../../../common/constants/messages';

export class CreateProductPhotoDto {
  @ApiProperty({ example: 1 })
  @IsInt({ message: VALIDATION_MESSAGES.INVALID_NUMBER })
  @Type(() => Number)
  productId: number;

  @ApiProperty({ example: 'uploads/products/iphone13-1.jpg' })
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  photo: string;

  @ApiProperty({ example: 'Ảnh mặt trước' })
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  description: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt({ message: VALIDATION_MESSAGES.INVALID_NUMBER })
  @Min(0, { message: VALIDATION_MESSAGES.MIN_VALUE(0) })
  @Type(() => Number)
  displayOrder?: number;
}
