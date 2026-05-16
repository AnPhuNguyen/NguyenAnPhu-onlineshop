import { Controller, Get, Post, Put, Delete, HttpCode, HttpStatus, Request, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { AdminCartService } from './admin-cart.service';
import { AddToCartDto, CartResponseDto, UpdateCartItemDto } from '../../shop/cart/dto/cart.dto';
import { CART_RESPONSES } from '../../common/constants/api-response';

/**
 * Controller giỏ hàng tạm cho admin (session/in-memory theo employeeId)
 */
@ApiTags('admin-cart')
@ApiBearerAuth('JWT-auth')
@Controller('admin/cart')
@Roles('employee')
export class AdminCartController {
  constructor(private adminCartService: AdminCartService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lấy thông tin admin cart' })
  @ApiResponse(CART_RESPONSES.GET_CART_SUCCESS)
  async getCart(@Request() req: any): Promise<CartResponseDto> {
    // payload userId => employeeId
    return this.adminCartService.getCart(req.user.userId);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Thêm sản phẩm vào admin cart' })
  @ApiResponse(CART_RESPONSES.ADD_TO_CART_SUCCESS)
  async addToCart(
    @Request() req: any,
    @Body() addToCartDto: AddToCartDto,
  ): Promise<CartResponseDto> {
    return this.adminCartService.addToCart(req.user.userId, addToCartDto);
  }

  @Put(':productId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cập nhật số lượng sản phẩm trong admin cart' })
  @ApiParam({ name: 'productId', description: 'ID sản phẩm cần cập nhật' })
  async updateCartItem(
    @Request() req: any,
    @Param('productId') productId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartResponseDto> {
    return this.adminCartService.updateCartItem(req.user.userId, productId, updateCartItemDto.quantity);
  }

  @Delete(':productId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Xóa sản phẩm khỏi admin cart' })
  @ApiParam({ name: 'productId', description: 'ID sản phẩm cần xóa' })
  async removeCartItem(
    @Request() req: any,
    @Param('productId') productId: number,
  ): Promise<CartResponseDto> {
    return this.adminCartService.removeCartItem(req.user.userId, productId);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Xóa toàn bộ admin cart' })
  async clearCart(@Request() req: any) {
    this.adminCartService.clearCart(req.user.userId);
    return { message: 'Đã xóa toàn bộ giỏ hàng' };
  }
}
