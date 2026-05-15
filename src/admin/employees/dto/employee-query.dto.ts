import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class EmployeeQueryDto {
  @ApiPropertyOptional({ description: 'Tìm theo tên nhân viên' })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiPropertyOptional({ description: 'Filter theo role: employee | employee,admin' })
  @IsOptional()
  @IsIn(['employee', 'employee,admin'])
  role?: string;

  @ApiPropertyOptional({ description: 'Filter theo trạng thái: working | inactive' })
  @IsOptional()
  @IsIn(['working', 'inactive'])
  workingStatus?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}

