import { ApiProperty } from '@nestjs/swagger';

export class EmployeeListItemDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Nguyễn An Phú' })
  name: string;

  @ApiProperty({ example: '1999-01-01', required: false })
  birthDate?: string | Date;

  @ApiProperty({ example: '0901234567', required: false })
  phone?: string;

  @ApiProperty({ example: 'employee@gmail.com' })
  email: string;

  @ApiProperty({ example: 'employee,admin' })
  roles: string;

  @ApiProperty({ example: true })
  isWorking: boolean;
}

