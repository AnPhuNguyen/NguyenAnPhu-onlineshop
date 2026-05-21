import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminCartService } from '../cart/admin-cart.service';
import { Order } from '../../common/entities/order.entity';
import { Customer } from '../../common/entities/customer.entity';
import { Province } from '../../common/entities/province.entity';
import { AdminCreateOrderDto, AdminOrderSearchDto, AdminUpdateStatusDto } from './dto/order-query.dto';
import { ORDER_MESSAGES, SUCCESS_MESSAGES } from '../../common/constants/messages';
import { OrderDetailDto } from '../../shop/orders/dto/order.dto';
import { OrderCoreService } from '../../common/modules/order-core/order-core.service';

@Injectable()
export class AdminOrdersService {
  constructor(
    private readonly adminCartService: AdminCartService,
    private readonly orderCoreService: OrderCoreService,

    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,

    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,
  ) { }

  async createOrderFromCart(
    employeeId: number,
    body: AdminCreateOrderDto,
  ) {
    const { customerId, deliveryProvince, deliveryAddress } = body;

    const cartItems = await this.adminCartService.getRawCartItems(employeeId);
    if (!cartItems || cartItems.length === 0) {
      throw new BadRequestException('Giỏ hàng đang trống');
    }

    const customer = await this.customerRepository.findOne({
      where: { customerId, isLocked: 0 },
    });
    if (!customer) {
      throw new NotFoundException('Không tìm thấy thông tin khách hàng hoặc tài khoản bị khóa');
    }

    // Validate Province
    if (deliveryProvince) {
      const provinceExists = await this.provinceRepository.findOne({ where: { provinceName: deliveryProvince } });
      if (!provinceExists) throw new BadRequestException(`Tỉnh/Thành phố "${deliveryProvince}" không hợp lệ`);
    }

    // Delegate to OrderCore for Intake and Snapshotting
    const savedOrder = await this.orderCoreService.createOrder({
      customerId,
      deliveryProvince: deliveryProvince ?? customer.province ?? '',
      deliveryAddress: deliveryAddress ?? customer.address ?? '',
      items: cartItems,
    });

    // clear admin cart after create
    this.adminCartService.clearCart(employeeId);

    return {
      message: SUCCESS_MESSAGES.CREATE_SUCCESS ?? 'Tạo đơn hàng thành công',
      orderId: savedOrder.orderId,
    };
  }

  async getOrders(query: AdminOrderSearchDto) {
    const { status, page = 1, limit = 10 } = query;

    const qb = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderDetails', 'orderDetails')
      .leftJoinAndSelect('orderDetails.product', 'product')
      .leftJoinAndSelect('order.customer', 'customer')
      .leftJoinAndSelect('order.employee', 'employee')
      .leftJoinAndSelect('order.shipper', 'shipper');

    if (status !== undefined) {
      qb.andWhere('order.status = :status', { status });
    }

    const skip = (page - 1) * limit;
    const [orders, total] = await qb
      .orderBy('order.orderTime', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      orders: orders.map((o) => this.formatOrder(o)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async searchOrders(query: AdminOrderSearchDto) {
    return this.getOrders(query);
  }

  async getOrderDetail(orderId: number): Promise<OrderDetailDto> {
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderDetails', 'orderDetails')
      .leftJoinAndSelect('orderDetails.product', 'product')
      .leftJoinAndSelect('order.customer', 'customer')
      .leftJoinAndSelect('order.employee', 'employee')
      .leftJoinAndSelect('order.shipper', 'shipper')
      .where('order.orderId = :orderId', { orderId })
      .getOne();

    if (!order) {
      throw new NotFoundException(ORDER_MESSAGES.NOT_FOUND ?? 'Không tìm thấy đơn hàng');
    }

    return this.formatOrder(order);
  }

  private formatOrder(order: any): OrderDetailDto {
    return {
      orderId: order.orderId,
      orderTime: order.orderTime,
      status: order.status,
      statusDescription: this.orderCoreService.getStatusLabel(order.status),
      deliveryAddress: order.deliveryAddress,
      deliveryProvince: order.deliveryProvince,
      totalAmount:
        order.orderDetails?.reduce(
          (sum, detail) => sum + (Number(detail.salePrice) * detail.quantity),
          0,
        ) || 0,
      orderDetails:
        order.orderDetails?.map((detail) => ({
          productId: detail.productId,
          productName: detail.product?.productName,
          quantity: detail.quantity,
          salePrice: Number(detail.salePrice),
        })) || [],
    } as OrderDetailDto;
  }

  async deleteOrder(orderId: number) {
    const order = await this.orderRepository.findOne({ where: { orderId } });
    if (!order) throw new NotFoundException(ORDER_MESSAGES.NOT_FOUND ?? 'Không tìm thấy đơn hàng');

    // Business Rule via status
    if (order.status === 2 || order.status === 3 || order.status === 4) {
      throw new ForbiddenException('Không thể xóa đơn hàng ở trạng thái đã chấp nhận, đang vận chuyển hoặc hoàn tất');
    }

    await this.orderRepository.delete({ orderId });
    return { message: SUCCESS_MESSAGES.DELETE_SUCCESS ?? 'Xóa đơn hàng thành công' };
  }

  async updateStatus(user: any, orderId: number, dto: AdminUpdateStatusDto) {
    const { status: nextStatus, shipperId } = dto;

    await this.orderCoreService.updateStatus({
      orderId,
      nextStatus,
      actorId: user.userId,
      actorRoles: user.roles || [],
      shipperId,
    });

    return {
      message: SUCCESS_MESSAGES.UPDATE_SUCCESS ?? 'Cập nhật trạng thái thành công',
      orderId,
      status: nextStatus,
    };
  }
}
