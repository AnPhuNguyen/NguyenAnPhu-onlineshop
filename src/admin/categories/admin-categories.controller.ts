import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { ADMIN_CATEGORIES_RESPONSES, COMMON_RESPONSES } from '../../common/constants/api-response';
import { AdminCategoriesService } from './admin-categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';


@ApiTags('admin-categories')
@ApiBearerAuth('JWT-auth')
@Roles('employee', 'admin')
@Controller('api/admin/categories')
export class AdminCategoriesController {
    constructor(private readonly adminCategoriesService: AdminCategoriesService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Lấy danh sách danh mục' })
    @ApiResponse(ADMIN_CATEGORIES_RESPONSES.GET_CATEGORIES_SUCCESS)
    @ApiQuery({ name: 'search', required: false, description: 'Tìm danh mục theo tên' })
    async list(
        @Query('search')
        search?: string,
    ) {
        return this.adminCategoriesService.list({ search });
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Tạo danh mục mới' })
    @ApiResponse(ADMIN_CATEGORIES_RESPONSES.CREATE_CATEGORY_SUCCESS)
    @ApiResponse(COMMON_RESPONSES.BAD_REQUEST)
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async create(@Body() dto: CreateCategoryDto) {
        return this.adminCategoriesService.create(dto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Cập nhật danh mục' })
    @ApiResponse(ADMIN_CATEGORIES_RESPONSES.UPDATE_CATEGORY_SUCCESS)
    @ApiResponse(ADMIN_CATEGORIES_RESPONSES.CATEGORY_NOT_FOUND)
    @ApiResponse(COMMON_RESPONSES.BAD_REQUEST)
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoryDto) {
        return this.adminCategoriesService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Xóa danh mục' })
    @ApiResponse(ADMIN_CATEGORIES_RESPONSES.DELETE_CATEGORY_SUCCESS)
    @ApiResponse(ADMIN_CATEGORIES_RESPONSES.CATEGORY_NOT_FOUND)
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.adminCategoriesService.delete(id);
    }
}

