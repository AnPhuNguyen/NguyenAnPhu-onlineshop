import { Controller, Get, Post, Param, Query, HttpCode, HttpStatus, Request, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ShopOrdersService } from './shop-orders.service';
import { CreateOrderDto, OrderDetailDto, OrderSearchDto } from './dto/order.dto';
import { Roles } from '../../common/decorators/roles.decorator';

/**
 * Controller xử lý API đơn hàng cho khách hàng
 * Cung cấp endpoint quản lý đơn hàng của khách hàng
 */
@ApiTags('shop-orders')
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
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo đơn hàng mới' })
  @ApiResponse({ status: 201, description: 'Tạo đơn hàng thành công' })
  @ApiResponse({ status: 400, description: 'Giỏ hàng trống hoặc sản phẩm không hợp lệ' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy sản phẩm hoặc khách hàng' })
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
  @ApiOperation({ summary: 'Lấy danh sách đơn hàng của khách hàng' })
  @ApiResponse({ status: 200, description: 'Lấy danh sách đơn hàng thành công' })
  @ApiQuery({ name: 'status', required: false, description: 'Lọc theo trạng thái đơn hàng' })
  @ApiQuery({ name: 'page', required: false, description: 'Trang hiện tại' })
  @ApiQuery({ name: 'limit', required: false, description: 'Số lượng mỗi trang' })
  async getCustomerOrders(
    @Request() req: any,
    @Query() searchDto: OrderSearchDto,
  ) {
    const userId = req.user.userId;
    return this.shopOrdersService.getCustomerOrders(userId, searchDto);
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
  @ApiResponse({ status: 200, description: 'Lấy chi tiết đơn hàng thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy đơn hàng' })
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
  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Hủy đơn hàng' })
  @ApiResponse({ status: 200, description: 'Hủy đơn hàng thành công' })
  @ApiResponse({ status: 403, description: 'Không thể hủy đơn hàng ở trạng thái này' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy đơn hàng' })
  @ApiParam({ name: 'id', description: 'ID đơn hàng' })
  async cancelOrder(
    @Request() req: any,
    @Param('id') orderId: number,
  ) {
    const userId = req.user.userId;
    return this.shopOrdersService.cancelOrder(userId, orderId);
  }
}
