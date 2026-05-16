import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { VALIDATION_MESSAGES } from '../../../common/constants/messages';

/**
 * Admin update customer (employee/admin được quyền chỉnh sửa trừ password)
 */
export class UpdateCustomerDto {
  @ApiProperty({ example: 'Nguyen Van A' })
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  @MaxLength(255)
  customerName: string;

  @ApiProperty({ example: 'Nguyen Van A' })
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  @MaxLength(255)
  contactName: string;

  @ApiProperty({ example: 'Hanoi' })
  @IsOptional()
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @MaxLength(255)
  province?: string;

  @ApiProperty({ example: '123 Street' })
  @IsOptional()
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @MaxLength(255)
  address?: string;

  @ApiProperty({ example: '0900000000' })
  @IsOptional()
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @MaxLength(255)
  phone?: string;

  @ApiProperty({ example: 'user@mail.com' })
  @IsOptional()
  @IsEmail({}, { message: VALIDATION_MESSAGES.INVALID_EMAIL })
  email?: string;

  @ApiProperty({ example: 0 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  isLocked?: number;
}
