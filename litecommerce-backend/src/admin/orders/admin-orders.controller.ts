import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { AdminOrdersService } from './admin-orders.service';
import { AdminCreateOrderDto, AdminOrderSearchDto, AdminUpdateStatusDto } from './dto/order-query.dto';
import { OrderDetailDto } from '../../shop/orders/dto/order.dto';

@ApiTags('admin-orders')
@ApiBearerAuth('JWT-auth')
@Controller('admin/orders')
@Roles('employee')
export class AdminOrdersController {
  constructor(private readonly adminOrdersService: AdminOrdersService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo đơn hàng từ admin cart' })
  createOrder(@Request() req: any, @Body() dto: AdminCreateOrderDto) {
    const employeeId = req.user.userId;
    return this.adminOrdersService.createOrderFromCart(employeeId, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lấy danh sách đơn hàng' })
  getOrders(@Query() query: AdminOrderSearchDto) {
    return this.adminOrdersService.getOrders(query);
  }

  @Get('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Tìm kiếm đơn hàng' })
  searchOrders(@Query() query: AdminOrderSearchDto) {
    return this.adminOrdersService.searchOrders(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Chi tiết đơn hàng' })
  @ApiParam({ name: 'id', description: 'ID đơn hàng' })
  getOrderDetail(@Param('id') orderId: number): Promise<OrderDetailDto> {
    return this.adminOrdersService.getOrderDetail(orderId);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Xóa đơn hàng' })
  @ApiParam({ name: 'id', description: 'ID đơn hàng' })
  deleteOrder(@Param('id') orderId: number) {
    return this.adminOrdersService.deleteOrder(orderId);
  }

  @Put('update-status/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cập nhật trạng thái đơn hàng (theo luồng)' })
  @ApiParam({ name: 'id', description: 'ID đơn hàng' })
  updateStatus(
    @Request() req: any,
    @Param('id') orderId: number,
    @Body() dto: AdminUpdateStatusDto,
  ) {
    const employeeId = req.user.userId;
    return this.adminOrdersService.updateStatus(employeeId, orderId, dto);
  }
}
