import { IsEmail, IsEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AUTH_MESSAGES, VALIDATION_MESSAGES } from '../../../common/constants/messages';

/**
 * DTO cho yêu cầu đăng nhập khách hàng
 */
export class LoginDto {
  /**
   * Email đăng nhập
   */
  @ApiProperty({ example: 'customer@example.com' })
  @IsEmail({}, { message: AUTH_MESSAGES.EMAIL_OR_PASSWORD_INVALID })
  email: string;

  /**
   * Mật khẩu
   */
  @ApiProperty({ example: 'password123' })
  @IsString({ message: AUTH_MESSAGES.EMAIL_OR_PASSWORD_INVALID })
  // @IsEmpty({ message: AUTH_MESSAGES.EMAIL_OR_PASSWORD_INVALID })
  password: string;
}
