import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({ description: 'Tên sản phẩm' })
    @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
    @IsString()
    productName: string;

    @ApiProperty({ description: 'Mô tả sản phẩm', required: false })
    @IsOptional()
    @IsString()
    productDescription?: string;

    @ApiProperty({ description: 'ID nhà cung cấp', required: false })
    @IsOptional()
    @IsNumber()
    supplierId?: number;

    @ApiProperty({ description: 'ID danh mục', required: false })
    @IsOptional()
    @IsNumber()
    categoryId?: number;

    @ApiProperty({ description: 'Đơn vị tính' })
    @IsNotEmpty({ message: 'Đơn vị tính không được để trống' })
    @IsString()
    unit: string;

    @ApiProperty({ description: 'Giá bán' })
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({ description: 'Link ảnh đại diện', required: false })
    @IsOptional()
    @IsString()
    photo?: string;

    @ApiProperty({ description: 'Trạng thái bán (0: ngừng, 1: đang bán)' })
    @IsNumber()
    isSelling: number;
}

export class UpdateProductDto extends CreateProductDto { }
