import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { ADMIN_PRODUCTS_RESPONSES } from '../../common/constants/api-response';
import { AdminProductsService } from './admin-products.service';
import { AdminProductQueryDto } from './dto/product-query.dto';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';

@ApiTags('admin-products')
@ApiBearerAuth('JWT-auth')
@Controller('admin/products')
@Roles('employee', 'admin')
export class AdminProductsController {
  constructor(private readonly adminProductsService: AdminProductsService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Tìm kiếm và lọc sản phẩm (admin)' })
  @ApiResponse(ADMIN_PRODUCTS_RESPONSES.GET_PRODUCTS_SUCCESS)
  @ApiQuery({ name: 'search', required: false, description: 'Tìm kiếm theo tên sản phẩm' })
  @ApiQuery({ name: 'categoryId', required: false, description: 'Lọc theo danh mục' })
  @ApiQuery({ name: 'supplierId', required: false, description: 'Lọc theo nhà cung cấp' })
  @ApiQuery({ name: 'minPrice', required: false, description: 'Giá tối thiểu' })
  @ApiQuery({ name: 'maxPrice', required: false, description: 'Giá tối đa' })
  @ApiQuery({ name: 'page', required: false, description: 'Trang hiện tại' })
  @ApiQuery({ name: 'limit', required: false, description: 'Số lượng mỗi trang' })
  async list(@Query() query: AdminProductQueryDto) {
    return this.adminProductsService.searchProducts(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lấy chi tiết sản phẩm (admin)' })
  @ApiResponse(ADMIN_PRODUCTS_RESPONSES.GET_PRODUCT_SUCCESS)
  @ApiResponse(ADMIN_PRODUCTS_RESPONSES.PRODUCT_NOT_FOUND)
  @ApiParam({ name: 'id', description: 'ID sản phẩm' })
  async detail(@Param('id', ParseIntPipe) id: number) {
    return this.adminProductsService.getProductDetail(id);
  }

  @Post()
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo sản phẩm mới' })
  async create(@Body() dto: CreateProductDto) {
    return this.adminProductsService.createProduct(dto);
  }

  @Put(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cập nhật thông tin sản phẩm' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return this.adminProductsService.updateProduct(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Xóa sản phẩm' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminProductsService.deleteProduct(id);
  }

  @Get(':id/attributes')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lấy danh sách thuộc tính theo productId (admin)' })
  @ApiResponse(ADMIN_PRODUCTS_RESPONSES.GET_PRODUCT_SUCCESS)
  @ApiParam({ name: 'id', description: 'ID sản phẩm' })
  async attributes(@Param('id', ParseIntPipe) id: number) {
    return this.adminProductsService.getProductAttributesByProductId(id);
  }
}
