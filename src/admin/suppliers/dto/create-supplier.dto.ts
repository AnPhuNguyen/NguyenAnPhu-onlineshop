import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { VALIDATION_MESSAGES } from '../../../common/constants/messages';

export class CreateSupplierDto {
  @ApiProperty({ example: 'Công ty ABC' })
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  @MaxLength(255, { message: VALIDATION_MESSAGES.MAX_LENGTH(255) })
  supplierName: string;

  @ApiProperty({ example: 'Nguyễn Văn A' })
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  @MaxLength(255, { message: VALIDATION_MESSAGES.MAX_LENGTH(255) })
  contactName: string;

  @ApiProperty({ example: 'Thành phố HCM', required: false })
  @IsOptional()
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @MaxLength(255, { message: VALIDATION_MESSAGES.MAX_LENGTH(255) })
  province?: string;

  @ApiProperty({ example: '123 đường ABC', required: false })
  @IsOptional()
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @MaxLength(255, { message: VALIDATION_MESSAGES.MAX_LENGTH(255) })
  address?: string;

  @ApiProperty({ example: '0901234567', required: false })
  @IsOptional()
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @MaxLength(255, { message: VALIDATION_MESSAGES.MAX_LENGTH(255) })
  phone?: string;

  @ApiProperty({ example: 'supplier@abc.com', required: false })
  @IsOptional()
  @IsEmail({}, { message: VALIDATION_MESSAGES.INVALID_EMAIL })
  @MaxLength(255, { message: VALIDATION_MESSAGES.MAX_LENGTH(255) })
  email?: string;
}

