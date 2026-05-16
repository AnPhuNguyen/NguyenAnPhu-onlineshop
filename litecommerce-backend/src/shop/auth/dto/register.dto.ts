import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AUTH_MESSAGES, VALIDATION_MESSAGES } from '../../../common/constants/messages';

/**
 * DTO cho yêu cầu đăng ký tài khoản khách hàng
 */
export class RegisterDto {
  /**
   * Tên đầy đủ của khách hàng
   */
  @ApiProperty({ example: 'Nguyễn Văn A' })
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  customerName: string;

  /**
   * Email đăng nhập (Unique)
   */
  @ApiProperty({ example: 'customer@example.com' })
  @IsEmail({}, { message: VALIDATION_MESSAGES.INVALID_EMAIL })
  email: string;

  /**
   * Mật khẩu
   */
  @ApiProperty({ example: 'password123' })
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @MinLength(6, { message: VALIDATION_MESSAGES.MIN_LENGTH(6) })
  password: string;

  /**
   * Xác nhận mật khẩu
   */
  @ApiProperty({ example: 'password123' })
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @MinLength(6, { message: VALIDATION_MESSAGES.MIN_LENGTH(6) })
  confirmPassword: string;
}
