import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO cho yêu cầu đăng nhập khách hàng
 */
export class LoginDto {
  /**
   * Email đăng nhập
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
}
