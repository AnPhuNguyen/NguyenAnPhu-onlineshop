import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CustomerQueryDto {
  @ApiPropertyOptional({ example: 'Nguyen' })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiPropertyOptional({ example: '0' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  @Type(() => Number)
  isLocked?: number;

  @ApiPropertyOptional({ example: 'Hanoi' })
  @IsOptional()
  @IsString()
  province?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number;
}
