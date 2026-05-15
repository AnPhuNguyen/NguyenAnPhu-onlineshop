import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { VALIDATION_MESSAGES } from '../../../common/constants/messages';

export class ChangeEmployeePasswordDto {
  @ApiProperty({ example: 'newPassword123' })
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  @MinLength(6, { message: VALIDATION_MESSAGES.MIN_LENGTH(6) })
  newPassword: string;

  @ApiProperty({ example: 'newPassword123' })
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  confirmPassword: string;
}

