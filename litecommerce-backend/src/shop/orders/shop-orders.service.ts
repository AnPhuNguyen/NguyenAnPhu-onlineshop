import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { ORDER_MESSAGES, PRODUCT_MESSAGES, SUCCESS_MESSAGES } from '../../common/constants/messages';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderDetail } from '../../common/entities/order-detail.entity';
import { Product } from '../../common/entities/product.entity';
import { Customer } from '../../common/entities/customer.entity';
import { CreateOrderDto, OrderDetailDto, OrderSearchDto } from './dto/order.dto';

/**
 * Service xử lý logic cho đơn hàng (shop)
 * Cung cấp các phương thức quản lý đơn hàng cho khách hàng
 */
@Injectable()
export class ShopOrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  /**
   * Tạo đơn hàng mới từ giỏ hàng
   * @param userId - ID khách hàng
   * @param createOrderDto - Thông tin tạo đơn hàng
   * @returns Đơn hàng đã tạo
   */
  async createOrder(userId: number, createOrderDto: CreateOrderDto) {
    const { items, deliveryProvince, deliveryAddress } = createOrderDto;

    // Kiểm tra giỏ hàng có trống không
    if (!items || items.length === 0) {
      throw new BadRequestException('Giỏ hàng trống');
    }

    // Lấy thông tin khách hàng
    const customer = await this.customerRepository.findOne({
      where: { customerId: userId, isLocked: 0 },
    });

    if (!customer) {
      throw new NotFoundException('Không tìm thấy thông tin khách hàng');
    }

    // Kiểm tra sản phẩm và tính tổng tiền
    let totalAmount = 0;
    const orderDetails: any[] = [];

    for (const item of items) {
      const product = await this.productRepository.findOne({
        where: { productId: item.productId, isSelling: 1 },
      });

      if (!product) {
        throw new NotFoundException(PRODUCT_MESSAGES.NOT_AVAILABLE);
      }

      if (item.quantity <= 0) {
        throw new BadRequestException('Số lượng sản phẩm phải lớn hơn 0');
      }

      totalAmount += product.price * item.quantity;
      orderDetails.push({
        productId: item.productId,
        quantity: item.quantity,
        salePrice: product.price,
      });
    }

    // Tạo đơn hàng
    const order = this.orderRepository.create({
      customerId: userId,
      orderTime: new Date(),
      deliveryProvince: deliveryProvince || customer.province,
      deliveryAddress: deliveryAddress || customer.address,
      status: 1, // Đơn hàng mới
    });

    const savedOrder = await this.orderRepository.save(order);

    // Tạo chi tiết đơn hàng
    for (const detail of orderDetails) {
      const orderDetail = this.orderDetailRepository.create({
        productId: detail.productId,
        quantity: detail.quantity,
        salePrice: detail.salePrice,
        orderId: savedOrder.orderId,
      });
      await this.orderDetailRepository.save(orderDetail);
    }

    return {
      message: SUCCESS_MESSAGES.CREATE_SUCCESS,
      orderId: savedOrder.orderId,
      totalAmount,
    };
  }

  /**
   * Lấy danh sách đơn hàng của khách hàng
   * @param userId - ID khách hàng
   * @param searchDto - Thông tin lọc và phân trang
   * @returns Danh sách đơn hàng phân trang
   */
  async getCustomerOrders(userId: number, searchDto: OrderSearchDto) {
    const { status, page = 1, limit = 10 } = searchDto;
    
    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderDetails', 'orderDetails')
      .leftJoinAndSelect('orderDetails.product', 'product')
      .where('order.customerId = :customerId', { customerId: userId });

    // Lọc theo trạng thái
    if (status !== undefined) {
      queryBuilder.andWhere('order.status = :status', { status });
    }

    // Sắp xếp theo thời gian giảm dần và phân trang
    const skip = (page - 1) * limit;
    const [orders, total] = await queryBuilder
      .orderBy('order.orderTime', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      orders: orders.map(order => this.formatOrder(order)),
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
   * @param userId - ID khách hàng
   * @param orderId - ID đơn hàng
   * @returns Chi tiết đơn hàng
   */
  async getOrderDetail(userId: number, orderId: number): Promise<OrderDetailDto> {
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderDetails', 'orderDetails')
      .leftJoinAndSelect('orderDetails.product', 'product')
      .leftJoinAndSelect('order.customer', 'customer')
      .leftJoinAndSelect('order.employee', 'employee')
      .leftJoinAndSelect('order.shipper', 'shipper')
      .where('order.orderId = :orderId', { orderId })
      .andWhere('order.customerId = :customerId', { customerId: userId })
      .getOne();

    if (!order) {
      throw new NotFoundException(ORDER_MESSAGES.NOT_FOUND);
    }

    return this.formatOrder(order);
  }

  /**
   * Hủy đơn hàng
   * @param userId - ID khách hàng
   * @param orderId - ID đơn hàng
   * @returns Thông báo hủy thành công
   */
  async cancelOrder(userId: number, orderId: number) {
    const order = await this.orderRepository.findOne({
      where: { orderId, customerId: userId },
    });

    if (!order) {
      throw new NotFoundException(ORDER_MESSAGES.NOT_FOUND);
    }

    // Chỉ được hủy khi trạng thái là 1 (mới) hoặc 2 (đã chấp nhận)
    if (order.status !== 1 && order.status !== 2) {
      throw new ForbiddenException(ORDER_MESSAGES.CANNOT_CANCEL);
    }

    // Cập nhật trạng thái thành -1 (đã hủy)
    await this.orderRepository.update({ orderId }, { status: -1 });

    return { message: SUCCESS_MESSAGES.CREATE_SUCCESS };
  }

  /**
   * Format dữ liệu đơn hàng để trả về
   * @param order - Dữ liệu đơn hàng từ database
   * @returns Order đã format
   */
  private formatOrder(order: any): OrderDetailDto {
    return {
      orderId: order.orderId,
      orderTime: order.orderTime,
      status: order.status,
      statusDescription: this.getStatusDescription(order.status),
      deliveryAddress: order.deliveryAddress,
      deliveryProvince: order.deliveryProvince,
      totalAmount: order.orderDetails?.reduce(
        (sum, detail) => sum + (detail.salePrice * detail.quantity),
        0
      ) || 0,
      orderDetails: order.orderDetails?.map(detail => ({
        productId: detail.productId,
        productName: detail.product?.productName,
        quantity: detail.quantity,
        salePrice: detail.salePrice,
      })) || [],
    };
  }

  /**
   * Lấy mô tả trạng thái đơn hàng
   * @param status - Mã trạng thái
   * @returns Mô tả trạng thái
   */
  private getStatusDescription(status: number): string {
    const statusMap = {
      '-2': 'Đơn hàng bị từ chối',
      '-1': 'Đơn hàng đã bị hủy',
      '1': 'Đơn hàng vừa gửi/khởi tạo',
      '2': 'Đơn hàng đã chấp nhận',
      '3': 'Đơn hàng đang được vận chuyển',
      '4': 'Đơn hàng đã hoàn tất',
    };
    return statusMap[status.toString()] || 'Không xác định';
  }
}
