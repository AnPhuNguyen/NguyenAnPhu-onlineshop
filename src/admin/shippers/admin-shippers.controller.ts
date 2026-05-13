import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { AdminShippersService } from './admin-shippers.service';
import { CreateShipperDto } from './dto/create-shipper.dto';
import { UpdateShipperDto } from './dto/update-shipper.dto';

@ApiTags('admin-shippers')
@ApiBearerAuth()
@Controller('api/admin/shippers')
export class AdminShippersController {
    constructor(private readonly adminShippersService: AdminShippersService) { }

    @Get()
    @Roles('employee')
    @ApiQuery({ name: 'search', required: false, description: 'tìm người giao hàng theo tên' })
    async list(
        @Query('search')
        search?: string,
    ) {
        return this.adminShippersService.list({ search });
    }

    @Post()
    @Roles('employee', 'admin')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async create(@Body() dto: CreateShipperDto) {
        return this.adminShippersService.create(dto);
    }

    @Put(':id')
    @Roles('employee', 'admin')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateShipperDto) {
        return this.adminShippersService.update(id, dto);
    }

    @Delete(':id')
    @Roles('employee', 'admin')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.adminShippersService.delete(id);
    }
}

