import { Controller, Get, Post, Param, HttpCode, HttpStatus, Request, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ShopOrdersService } from './shop-orders.service';
import { CreateOrderDto, OrderDetailDto, OrderSearchDto } from './dto/order.dto';
import { ORDER_RESPONSES, PRODUCT_RESPONSES } from '../../common/constants/api-response';
import { Roles } from '../../common/decorators/roles.decorator';

/**
 * Controller xử lý API đơn hàng cho khách hàng
 * Cung cấp endpoint quản lý đơn hàng của khách hàng
 */
@ApiTags('shop-orders')
@ApiBearerAuth('JWT-auth')
@Controller('shop/orders')
@Roles('customer')
export class ShopOrdersController {
  constructor(private shopOrdersService: ShopOrdersService) {}

  /**
   * API tạo đơn hàng mới
   * @param userId - ID khách hàng (từ token)
   * @param createOrderDto - Thông tin tạo đơn hàng
   * @returns Đơn hàng đã tạo
   */
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo đơn hàng mới' })
  @ApiResponse(ORDER_RESPONSES.CREATE_ORDER_SUCCESS)
  @ApiResponse(ORDER_RESPONSES.CART_EMPTY)
  @ApiResponse(PRODUCT_RESPONSES.PRODUCT_NOT_FOUND)
  async createOrder(
    @Request() req: any,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const userId = req.user.userId;
    return this.shopOrdersService.createOrder(userId, createOrderDto);
  }

  /**
   * API lấy danh sách đơn hàng của khách hàng
   * @param userId - ID khách hàng (từ token)
   * @param searchDto - Thông tin lọc và phân trang
   * @returns Danh sách đơn hàng phân trang
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lấy danh sách đơn hàng' })
  @ApiResponse(ORDER_RESPONSES.GET_ORDERS_SUCCESS)
  @ApiQuery({ name: 'status', required: false, description: 'Lọc theo trạng thái' })
  @ApiQuery({ name: 'page', required: false, description: 'Trang hiện tại' })
  @ApiQuery({ name: 'limit', required: false, description: 'Số lượng mỗi trang' })
  async getOrders(
    @Request() req: any,
    @Query() query: OrderSearchDto,
  ) {
    const userId = req.user.userId;
    return this.shopOrdersService.getCustomerOrders(userId, query);
  }

  /**
   * API lấy chi tiết đơn hàng
   * @param userId - ID khách hàng (từ token)
   * @param orderId - ID đơn hàng
   * @returns Chi tiết đơn hàng
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lấy chi tiết đơn hàng' })
  @ApiResponse(ORDER_RESPONSES.GET_ORDER_SUCCESS)
  @ApiResponse(ORDER_RESPONSES.ORDER_NOT_FOUND)
  @ApiParam({ name: 'id', description: 'ID đơn hàng' })
  async getOrderDetail(
    @Request() req: any,
    @Param('id') orderId: number,
  ): Promise<OrderDetailDto> {
    const userId = req.user.userId;
    return this.shopOrdersService.getOrderDetail(userId, orderId);
  }

  /**
   * API hủy đơn hàng
   * @param userId - ID khách hàng (từ token)
   * @param orderId - ID đơn hàng
   * @returns Thông báo hủy thành công
   */
  @Post('cancel/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Hủy đơn hàng' })
  @ApiResponse(ORDER_RESPONSES.CANCEL_ORDER_SUCCESS)
  @ApiResponse(ORDER_RESPONSES.CANNOT_CANCEL_ORDER)
  @ApiResponse(ORDER_RESPONSES.ORDER_NOT_FOUND)
  @ApiParam({ name: 'id', description: 'ID đơn hàng' })
  async cancelOrder(
    @Request() req: any,
    @Param('id') orderId: number,
  ) {
    const userId = req.user.userId;
    return this.shopOrdersService.cancelOrder(userId, orderId);
  }
}
