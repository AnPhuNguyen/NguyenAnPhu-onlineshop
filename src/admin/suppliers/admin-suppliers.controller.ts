import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { AdminSuppliersService } from './admin-suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@ApiTags('admin-suppliers')
@ApiBearerAuth()
@Controller('api/admin/suppliers')
export class AdminSuppliersController {
  constructor(private readonly adminSuppliersService: AdminSuppliersService) {}

  @Get()
  @Roles('employee')
  @ApiQuery({ name: 'search', required: false, description: 'Tìm nhà cung cấp theo tên' })
  async list(
    @Query('search')
    search?: string,
  ) {
    return this.adminSuppliersService.list({ search });
  }

  @Post()
  @Roles('employee', 'admin')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(@Body() dto: CreateSupplierDto) {
    return this.adminSuppliersService.create(dto);
  }

  @Put(':id')
  @Roles('employee', 'admin')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSupplierDto,
  ) {
    return this.adminSuppliersService.update(id, dto);
  }

  @Delete(':id')
  @Roles('employee', 'admin')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminSuppliersService.delete(id);
  }
}

