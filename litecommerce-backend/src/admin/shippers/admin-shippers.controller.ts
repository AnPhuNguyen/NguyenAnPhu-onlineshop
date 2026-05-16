import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { ADMIN_SHIPPERS_RESPONSES, COMMON_RESPONSES } from '../../common/constants/api-response';
import { AdminShippersService } from './admin-shippers.service';
import { CreateShipperDto } from './dto/create-shipper.dto';
import { UpdateShipperDto } from './dto/update-shipper.dto';

@ApiTags('admin-shippers')
@ApiBearerAuth('JWT-auth')
@Roles('employee', 'admin')
@Controller('admin/shippers')
export class AdminShippersController {
    constructor(private readonly adminShippersService: AdminShippersService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Lấy danh sách người giao hàng' })
    @ApiResponse(ADMIN_SHIPPERS_RESPONSES.GET_SHIPPERS_SUCCESS)
    @ApiQuery({ name: 'search', required: false, description: 'Tìm người giao hàng theo tên' })
    async list(
        @Query('search')
        search?: string,
    ) {
        return this.adminShippersService.list({ search });
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Tạo người giao hàng mới' })
    @ApiResponse(ADMIN_SHIPPERS_RESPONSES.CREATE_SHIPPER_SUCCESS)
    @ApiResponse(COMMON_RESPONSES.BAD_REQUEST)
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async create(@Body() dto: CreateShipperDto) {
        return this.adminShippersService.create(dto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Cập nhật người giao hàng' })
    @ApiResponse(ADMIN_SHIPPERS_RESPONSES.UPDATE_SHIPPER_SUCCESS)
    @ApiResponse(ADMIN_SHIPPERS_RESPONSES.SHIPPER_NOT_FOUND)
    @ApiResponse(COMMON_RESPONSES.BAD_REQUEST)
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateShipperDto) {
        return this.adminShippersService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Xóa người giao hàng' })
    @ApiResponse(ADMIN_SHIPPERS_RESPONSES.DELETE_SHIPPER_SUCCESS)
    @ApiResponse(ADMIN_SHIPPERS_RESPONSES.SHIPPER_NOT_FOUND)
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.adminShippersService.delete(id);
    }
}

