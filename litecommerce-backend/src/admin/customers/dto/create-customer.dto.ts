import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCustomerDto {
    @ApiProperty({ description: 'Tên khách hàng' })
    @IsNotEmpty({ message: 'Tên khách hàng không được để trống' })
    @IsString()
    customerName: string;

    @ApiProperty({ description: 'Tên liên hệ', required: false })
    @IsOptional()
    @IsString()
    contactName?: string;

    @ApiProperty({ description: 'Email' })
    @IsNotEmpty({ message: 'Email không được để trống' })
    @IsEmail({}, { message: 'Email không hợp lệ' })
    email: string;

    @ApiProperty({ description: 'Mật khẩu', required: false })
    @IsOptional()
    @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
    password?: string;

    @ApiProperty({ description: 'Tỉnh/Thành phố', required: false })
    @IsOptional()
    @IsString()
    province?: string;

    @ApiProperty({ description: 'Địa chỉ', required: false })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty({ description: 'Số điện thoại', required: false })
    @IsOptional()
    @IsString()
    phone?: string;
}
