import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { VALIDATION_MESSAGES } from '../../../common/constants/messages';

export class CreateEmployeeDto {
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

  @ApiProperty({ example: 'employee1@gmail.com' })
  @IsEmail({}, { message: VALIDATION_MESSAGES.INVALID_EMAIL })
  email: string;

  @ApiProperty({ example: '123456', required: false, description: 'Password mặc định hoặc password gửi từ UI' })
  @IsOptional()
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  password?: string;

  @ApiProperty({ example: 'Địa chỉ nhân viên', required: false })
  @IsOptional()
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  address?: string;
}

