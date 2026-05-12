import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VALIDATION_MESSAGES } from '../../../common/constants/messages';

export class AdminLoginDto {
  @ApiProperty({ example: 'admin@gmail.com' })
  @IsEmail({}, { message: VALIDATION_MESSAGES.INVALID_EMAIL })
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  password: string;
}
