import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO cho yêu cầu đăng ký tài khoản khách hàng
 */
export class RegisterDto {
  /**
   * Tên đầy đủ của khách hàng
   */
  @ApiProperty({ example: 'Nguyễn Văn A' })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  /**
   * Email đăng nhập (Unique)
   */
  @ApiProperty({ example: 'customer@example.com' })
  @IsEmail()
  email: string;

  /**
   * Mật khẩu
   */
  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  /**
   * Xác nhận mật khẩu
   */
  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  confirmPassword: string;
}
