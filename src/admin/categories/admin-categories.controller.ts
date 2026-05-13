import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { AdminCategoriesService } from './admin-categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';


@ApiTags('admin-categories')
@ApiBearerAuth()
@Controller('api/admin/categories')
export class AdminCategoriesController {
    constructor(private readonly adminCategoriesService: AdminCategoriesService) { }

    @Get()
    @Roles('employee')
    @ApiQuery({ name: 'search', required: false, description: 'tìm danh mục theo tên' })
    async list(
        @Query('search')
        search?: string,
    ) {
        return this.adminCategoriesService.list({ search });
    }

    @Post()
    @Roles('employee', 'admin')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async create(@Body() dto: CreateCategoryDto) {
        return this.adminCategoriesService.create(dto);
    }

    @Put(':id')
    @Roles('employee', 'admin')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoryDto) {
        return this.adminCategoriesService.update(id, dto);
    }

    @Delete(':id')
    @Roles('employee', 'admin')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.adminCategoriesService.delete(id);
    }
}

