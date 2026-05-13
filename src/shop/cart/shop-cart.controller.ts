import { Controller, Get, Post, Put, Delete, Param, HttpCode, HttpStatus, Request, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ShopCartService } from './shop-cart.service';
import { AddToCartDto, UpdateCartItemDto, CartResponseDto } from './dto/cart.dto';
import { CART_RESPONSES } from '../../common/constants/api-response';
import { Roles } from 'src/common/decorators/roles.decorator';

/**
 * Controller xử lý API giỏ hàng cho khách hàng
 * Giỏ hàng lưu trong bộ nhớ server theo phiên làm việc của khách hàng
 */
@ApiTags('shop-cart')
@ApiBearerAuth('JWT-auth')
@Roles('customer')
@Controller('shop/cart')
export class ShopCartController {
  constructor(private shopCartService: ShopCartService) {}

  /**
   * Lấy thông tin giỏ hàng hiện tại của khách hàng
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lấy thông tin giỏ hàng' })
  @ApiResponse(CART_RESPONSES.GET_CART_SUCCESS)
  async getCart(@Request() req: any): Promise<CartResponseDto> {
    return this.shopCartService.getCart(req.user.userId);
  }

  /**
   * Thêm sản phẩm vào giỏ hàng
   * Nếu sản phẩm đã có thì cộng thêm số lượng
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Thêm sản phẩm vào giỏ hàng' })
  @ApiResponse(CART_RESPONSES.ADD_TO_CART_SUCCESS)
  @ApiResponse(CART_RESPONSES.PRODUCT_NOT_FOUND)
  async addToCart(@Request() req: any, @Body() addToCartDto: AddToCartDto): Promise<CartResponseDto> {
    return this.shopCartService.addToCart(req.user.userId, addToCartDto);
  }

  /**
   * Cập nhật số lượng của một sản phẩm trong giỏ hàng
   * Truyền quantity = 0 để xóa sản phẩm đó khỏi giỏ
   */
  @Put(':productId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cập nhật số lượng sản phẩm trong giỏ' })
  @ApiParam({ name: 'productId', description: 'ID sản phẩm cần cập nhật' })
  @ApiResponse(CART_RESPONSES.ADD_TO_CART_SUCCESS)
  async updateCartItem(
    @Request() req: any,
    @Param('productId') productId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartResponseDto> {
    return this.shopCartService.updateCartItem(req.user.userId, productId, updateCartItemDto.quantity);
  }

  /**
   * Xóa một sản phẩm khỏi giỏ hàng
   */
  @Delete(':productId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Xóa một sản phẩm khỏi giỏ hàng' })
  @ApiParam({ name: 'productId', description: 'ID sản phẩm cần xóa' })
  @ApiResponse(CART_RESPONSES.GET_CART_SUCCESS)
  async removeCartItem(
    @Request() req: any,
    @Param('productId') productId: number,
  ): Promise<CartResponseDto> {
    return this.shopCartService.removeCartItem(req.user.userId, productId);
  }

  /**
   * Xóa toàn bộ giỏ hàng
   */
  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Xóa toàn bộ giỏ hàng' })
  async clearCart(@Request() req: any) {
    this.shopCartService.clearCart(req.user.userId);
    return { message: 'Đã xóa toàn bộ giỏ hàng' };
  }
}