import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { VALIDATION_MESSAGES } from '../../../common/constants/messages';

export class UpdateEmployeeDto {
  @ApiProperty({ example: 'Nguyễn An Phú' })
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  fullName: string;

  @ApiProperty({ example: '1999-01-01', required: false })
  @IsOptional()
  @IsDate({ message: 'birthDate must be a valid date' })
  birthDate?: Date;

  @ApiProperty({ example: '+84 123456789', required: false })
  @IsOptional()
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  phone?: string;

  @ApiProperty({ example: 'Địa chỉ nhân viên', required: false })
  @IsOptional()
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  address?: string;

  @ApiProperty({ example: 1, required: false, description: '0: nghỉ, 1: đang làm' })
  @IsOptional()
  @IsString({ message: VALIDATION_MESSAGES.INVALID_NUMBER })
  // NOTE: repo dùng tinyint; UI hiện checkbox boolean => client sẽ gửi 0/1
  isWorking?: any;
}

