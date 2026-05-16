import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { VALIDATION_MESSAGES } from '../../../common/constants/messages';

export class CreateShipperDto {
  @ApiProperty({ example: 'Giao hàng nhanh' })
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  @MaxLength(255, { message: VALIDATION_MESSAGES.MAX_LENGTH(255) })
  shipperName: string;

  @ApiProperty({ example: '0901234567', required: false })
  @IsOptional()
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @MaxLength(255, { message: VALIDATION_MESSAGES.MAX_LENGTH(255) })
  phone?: string;
}

