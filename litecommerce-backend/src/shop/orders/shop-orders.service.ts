import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ORDER_MESSAGES, SUCCESS_MESSAGES } from '../../common/constants/messages';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../common/entities/order.entity';
import { ShopCartService } from '../cart/shop-cart.service';
import { Province } from '../../common/entities/province.entity';
import { Customer } from '../../common/entities/customer.entity';
import { CreateOrderDto, OrderDetailDto, OrderSearchDto } from './dto/order.dto';
import { OrderCoreService } from '../../common/modules/order-core/order-core.service';

/**
 * Service xử lý logic cho đơn hàng (shop)
 * Cung cấp các phương thức quản lý đơn hàng cho khách hàng
 */
@Injectable()
export class ShopOrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,

    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,

    private readonly shopCartService: ShopCartService,
    private readonly orderCoreService: OrderCoreService,
  ) { }

  /**
   * Tạo đơn hàng mới từ giỏ hàng
   */
  async createOrder(userId: number, createOrderDto: CreateOrderDto) {
    const { deliveryProvince, deliveryAddress } = createOrderDto;

    const cartItems = await this.shopCartService.getRawCartItems(userId);
    if (!cartItems || cartItems.length === 0) {
      throw new BadRequestException('Giỏ hàng đang trống');
    }

    const customer = await this.customerRepository.findOne({ where: { customerId: userId } });
    if (!customer) throw new NotFoundException('Không tìm thấy thông tin khách hàng');

    // Chốt đơn thông qua OrderCore (Snapshot giá tại đây)
    const order = await this.orderCoreService.createOrder({
      customerId: userId,
      deliveryProvince: deliveryProvince || customer.province || '',
      deliveryAddress: deliveryAddress || customer.address || '',
      items: cartItems,
    });

    // Xóa giỏ hàng sau khi đặt hàng thành công
    this.shopCartService.clearCart(userId);

    return {
      message: SUCCESS_MESSAGES.CREATE_SUCCESS ?? 'Đặt hàng thành công',
      orderId: order.orderId,
    };
  }

  /**
   * Lấy danh sách đơn hàng của khách hàng
   */
  async getCustomerOrders(userId: number, searchDto: OrderSearchDto) {
    const { status, page = 1, limit = 10 } = searchDto;

    const qb = this.orderRepository
      .createQueryBuilder('order')
      .where('order.customerId = :userId', { userId });

    if (status) {
      qb.andWhere('order.status = :status', { status });
    }

    const [orders, total] = await qb
      .orderBy('order.orderTime', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      orders: orders.map(o => this.formatOrder(o)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Lấy chi tiết đơn hàng
   */
  async getOrderDetail(userId: number, orderId: number): Promise<OrderDetailDto> {
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderDetails', 'orderDetails')
      .leftJoinAndSelect('orderDetails.product', 'product')
      .where('order.orderId = :orderId AND order.customerId = :userId', { orderId, userId })
      .getOne();

    if (!order) {
      throw new NotFoundException(ORDER_MESSAGES.NOT_FOUND);
    }

    return this.formatOrder(order);
  }

  /**
   * Hủy đơn hàng
   */
  async cancelOrder(userId: number, orderId: number) {
    await this.orderCoreService.customerCancel(orderId, userId);
    return { message: SUCCESS_MESSAGES.CANCEL_SUCCESS ?? 'Hủy đơn hàng thành công' };
  }

  /**
   * Format dữ liệu đơn hàng
   */
  formatOrder(order: any): OrderDetailDto {
    return {
      orderId: order.orderId,
      orderTime: order.orderTime,
      status: order.status,
      statusDescription: this.orderCoreService.getStatusLabel(order.status),
      deliveryAddress: order.deliveryAddress,
      deliveryProvince: order.deliveryProvince,
      totalAmount: order.orderDetails?.reduce((sum, d) => sum + (Number(d.salePrice) * d.quantity), 0) || 0,
      orderDetails: order.orderDetails?.map(d => ({
        productId: d.productId,
        productName: d.product?.productName,
        quantity: d.quantity,
        salePrice: Number(d.salePrice),
        total: Number(d.salePrice) * d.quantity,
      })) || [],
    } as OrderDetailDto;
  }
}
