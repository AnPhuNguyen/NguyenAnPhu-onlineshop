import { Controller, Get, Query, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ShopProductsService } from './shop-products.service';
import { ProductSearchDto, ProductDetailDto } from './dto/product.dto';
import { Public } from '../../common/decorators/public.decorator';

/**
 * Controller xử lý API sản phẩm cho khách hàng
 * Cung cấp endpoint tìm kiếm, lọc sản phẩm
 */
@ApiTags('shop-products')
@Controller('shop/products')
export class ShopProductsController {
  constructor(private shopProductsService: ShopProductsService) {}

  /**
   * API tìm kiếm và lọc sản phẩm
   * @param searchDto - Thông tin tìm kiếm và lọc
   * @returns Danh sách sản phẩm phân trang
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Tìm kiếm và lọc sản phẩm' })
  @ApiResponse({ status: 200, description: 'Lấy danh sách sản phẩm thành công' })
  @ApiQuery({ name: 'search', required: false, description: 'Tìm kiếm theo tên sản phẩm' })
  @ApiQuery({ name: 'categoryId', required: false, description: 'Lọc theo danh mục' })
  @ApiQuery({ name: 'minPrice', required: false, description: 'Giá tối thiểu' })
  @ApiQuery({ name: 'maxPrice', required: false, description: 'Giá tối đa' })
  @ApiQuery({ name: 'page', required: false, description: 'Trang hiện tại' })
  @ApiQuery({ name: 'limit', required: false, description: 'Số lượng mỗi trang' })
  async searchProducts(@Query() searchDto: ProductSearchDto) {
    return this.shopProductsService.searchProducts(searchDto);
  }

  /**
   * API lấy chi tiết sản phẩm
   * @param productId - ID sản phẩm
   * @returns Chi tiết sản phẩm
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lấy chi tiết sản phẩm' })
  @ApiResponse({ status: 200, description: 'Lấy chi tiết sản phẩm thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy sản phẩm' })
  @ApiParam({ name: 'id', description: 'ID sản phẩm' })
  async getProductDetail(@Param('id') productId: number): Promise<ProductDetailDto> {
    return this.shopProductsService.getProductDetail(productId);
  }

  /**
   * API lấy danh sách danh mục sản phẩm
   * @returns Danh sách các danh mục đang có sản phẩm
   */
  @Get('categories')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lấy danh sách danh mục sản phẩm' })
  @ApiResponse({ status: 200, description: 'Lấy danh mục thành công' })
  async getCategories() {
    return this.shopProductsService.getCategories();
  }
}
