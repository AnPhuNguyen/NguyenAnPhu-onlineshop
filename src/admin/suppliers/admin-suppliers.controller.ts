import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { ADMIN_SUPPLIERS_RESPONSES, COMMON_RESPONSES } from '../../common/constants/api-response';
import { AdminSuppliersService } from './admin-suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@ApiTags('admin-suppliers')
@ApiBearerAuth('JWT-auth')
@Roles('employee', 'admin')
@Controller('api/admin/suppliers')
export class AdminSuppliersController {
  constructor(private readonly adminSuppliersService: AdminSuppliersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lấy danh sách nhà cung cấp' })
  @ApiResponse(ADMIN_SUPPLIERS_RESPONSES.GET_SUPPLIERS_SUCCESS)
  @ApiQuery({ name: 'search', required: false, description: 'Tìm nhà cung cấp theo tên' })
  async list(
    @Query('search')
    search?: string,
  ) {
    return this.adminSuppliersService.list({ search });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo nhà cung cấp mới' })
  @ApiResponse(ADMIN_SUPPLIERS_RESPONSES.CREATE_SUPPLIER_SUCCESS)
  @ApiResponse(COMMON_RESPONSES.BAD_REQUEST)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(@Body() dto: CreateSupplierDto) {
    return this.adminSuppliersService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cập nhật nhà cung cấp' })
  @ApiResponse(ADMIN_SUPPLIERS_RESPONSES.UPDATE_SUPPLIER_SUCCESS)
  @ApiResponse(ADMIN_SUPPLIERS_RESPONSES.SUPPLIER_NOT_FOUND)
  @ApiResponse(COMMON_RESPONSES.BAD_REQUEST)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSupplierDto,
  ) {
    return this.adminSuppliersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Xóa nhà cung cấp' })
  @ApiResponse(ADMIN_SUPPLIERS_RESPONSES.DELETE_SUPPLIER_SUCCESS)
  @ApiResponse(ADMIN_SUPPLIERS_RESPONSES.SUPPLIER_NOT_FOUND)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminSuppliersService.delete(id);
  }
}

