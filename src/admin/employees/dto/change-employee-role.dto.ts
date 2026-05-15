import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { VALIDATION_MESSAGES } from '../../../common/constants/messages';

export class ChangeEmployeeRoleDto {
  @ApiProperty({ example: 'employee,admin', description: 'employee | employee,admin' })
  @IsString({ message: VALIDATION_MESSAGES.INVALID_STRING })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  @IsIn(['employee', 'employee,admin'], { message: VALIDATION_MESSAGES.INVALID_STRING })
  roleNames: string;
}

