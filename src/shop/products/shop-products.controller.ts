import { Controller, Get, Query, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ShopProductsService } from './shop-products.service';
import { ProductSearchDto, ProductDetailDto } from './dto/product.dto';
import { PRODUCT_RESPONSES } from '../../common/constants/api-response';
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
   * @param query - Thông tin tìm kiếm và lọc
   * @returns Danh sách sản phẩm phân trang
   */
  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Tìm kiếm và lọc sản phẩm' })
  @ApiResponse(PRODUCT_RESPONSES.GET_PRODUCTS_SUCCESS)
  @ApiQuery({ name: 'search', required: false, description: 'Tìm kiếm theo tên sản phẩm' })
  @ApiQuery({ name: 'categoryId', required: false, description: 'Lọc theo danh mục' })
  @ApiQuery({ name: 'minPrice', required: false, description: 'Giá tối thiểu' })
  @ApiQuery({ name: 'maxPrice', required: false, description: 'Giá tối đa' })
  @ApiQuery({ name: 'page', required: false, description: 'Trang hiện tại' })
  @ApiQuery({ name: 'limit', required: false, description: 'Số lượng mỗi trang' })
  async getProducts(@Query() query: ProductSearchDto) {
    return this.shopProductsService.searchProducts(query);
  }

  /**
   * API lấy chi tiết sản phẩm
   * @param productId - ID sản phẩm
   * @returns Chi tiết sản phẩm
   */
  @Get('categories')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lấy danh sách danh mục sản phẩm' })
  @ApiResponse(PRODUCT_RESPONSES.GET_CATEGORIES_SUCCESS)
  async getCategories() {
    return this.shopProductsService.getCategories();
  }

  /**
   * API lấy chi tiết sản phẩm
   * @param productId - ID sản phẩm
   * @returns Chi tiết sản phẩm
   */
  @Get(':id')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lấy chi tiết sản phẩm' })
  @ApiResponse(PRODUCT_RESPONSES.GET_PRODUCT_SUCCESS)
  @ApiResponse(PRODUCT_RESPONSES.PRODUCT_NOT_FOUND)
  @ApiParam({ name: 'id', description: 'ID sản phẩm' })
  async getProductDetail(@Param('id') productId: number): Promise<ProductDetailDto> {
    return this.shopProductsService.getProductDetail(productId);
  }
}
