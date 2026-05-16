import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { VALIDATION_MESSAGES } from '../../../common/constants/messages';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Điện tử',
    description: 'Tên danh mục',
  })
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  @MaxLength(255, { message: VALIDATION_MESSAGES.MAX_LENGTH(255) })
  categoryName: string;

  @ApiProperty({
    example: 'Nhóm sản phẩm điện tử',
    required: false,
  })
  @IsOptional()
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @MaxLength(255, { message: VALIDATION_MESSAGES.MAX_LENGTH(255) })
  description?: string;
}

