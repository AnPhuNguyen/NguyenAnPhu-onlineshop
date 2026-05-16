import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { AdminCartService } from '../cart/admin-cart.service';
import { Order } from '../../common/entities/order.entity';
import { OrderDetail } from '../../common/entities/order-detail.entity';
import { Product } from '../../common/entities/product.entity';
import { Customer } from '../../common/entities/customer.entity';
import { Employee } from '../../common/entities/employee.entity';
import { Shipper } from '../../common/entities/shipper.entity';
import { Province } from '../../common/entities/province.entity';
import { AdminCreateOrderDto, AdminOrderSearchDto, AdminUpdateStatusDto, OrderItemAdminDto } from './dto/order-query.dto';
import { ORDER_MESSAGES, SUCCESS_MESSAGES } from '../../common/constants/messages';
import { OrderDetailDto } from '../../shop/orders/dto/order.dto';

@Injectable()
export class AdminOrdersService {
  constructor(
    private readonly adminCartService: AdminCartService,

    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,

    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,

    @InjectRepository(Shipper)
    private shipperRepository: Repository<Shipper>,

    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,
  ) { }

  private getStatusDescription(status: number): string {
    const statusMap: Record<string, string> = {
      '-2': 'Đơn hàng bị từ chối',
      '-1': 'Đơn hàng đã bị hủy',
      '1': 'Đơn hàng vừa gửi/khởi tạo',
      '2': 'Đơn hàng đã chấp nhận',
      '3': 'Đơn hàng đang được vận chuyển',
      '4': 'Đơn hàng đã hoàn tất',
    };
    return statusMap[status.toString()] || 'Không xác định';
  }

  async createOrderFromCart(
    employeeId: number,
    body: AdminCreateOrderDto,
  ) {
    const { customerId, deliveryProvince, deliveryAddress } = body;

    const cartItems = this.adminCartService.getRawCartItems(employeeId);
    if (!cartItems || cartItems.length === 0) {
      throw new BadRequestException('Giỏ hàng đang trống');
    }

    const customer = await this.customerRepository.findOne({
      where: { customerId, isLocked: 0 },
    });
    if (!customer) {
      throw new NotFoundException('Không tìm thấy thông tin khách hàng hoặc tài khoản bị khóa');
    }

    // Kiểm tra ràng buộc tỉnh thành
    if (deliveryProvince) {
      const provinceExists = await this.provinceRepository.findOne({ where: { provinceName: deliveryProvince } });
      if (!provinceExists) throw new BadRequestException(`Tỉnh/Thành phố "${deliveryProvince}" không hợp lệ`);
    } else if (customer.province) {
      const provinceExists = await this.provinceRepository.findOne({ where: { provinceName: customer.province } });
      if (!provinceExists) throw new BadRequestException(`Tỉnh/Thành phố "${customer.province}" của khách hàng không có trong danh sách hỗ trợ`);
    }

    // Validate products exist + IsSelling=1 and compute salePrice from DB
    let totalAmount = 0;
    const orderDetails: { productId: number; quantity: number; salePrice: number }[] = [];

    for (const item of cartItems) {
      const product = await this.productRepository.findOne({
        where: { productId: item.productId, isSelling: 1 },
      });

      if (!product) {
        throw new NotFoundException(`Sản phẩm (ID: ${item.productId}) không còn bán`);
      }

      if (item.quantity <= 0) {
        throw new BadRequestException('Số lượng sản phẩm phải lớn hơn 0');
      }

      const salePrice = Number(product.price);
      totalAmount += salePrice * item.quantity;
      orderDetails.push({
        productId: item.productId,
        quantity: item.quantity,
        salePrice,
      });
    }

    // Create order with status=1 and only set delivery fields; others null
    const order = this.orderRepository.create({
      customerId,
      orderTime: new Date(),
      deliveryProvince: deliveryProvince ?? customer.province,
      deliveryAddress: deliveryAddress ?? customer.address,
      status: 1,
    });

    const savedOrder = await this.orderRepository.save(order);

    for (const detail of orderDetails) {
      const orderDetail = this.orderDetailRepository.create({
        orderId: savedOrder.orderId,
        productId: detail.productId,
        quantity: detail.quantity,
        salePrice: detail.salePrice,
      });
      await this.orderDetailRepository.save(orderDetail);
    }

    // clear admin cart after create
    this.adminCartService.clearCart(employeeId);

    return {
      message: SUCCESS_MESSAGES.CREATE_SUCCESS ?? 'Tạo đơn hàng thành công',
      orderId: savedOrder.orderId,
      totalAmount,
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
      statusDescription: this.getStatusDescription(order.status),
      deliveryAddress: order.deliveryAddress,
      deliveryProvince: order.deliveryProvince,
      totalAmount:
        order.orderDetails?.reduce(
          (sum, detail) => sum + (detail.salePrice * detail.quantity),
          0,
        ) || 0,
      orderDetails:
        order.orderDetails?.map((detail) => ({
          productId: detail.productId,
          productName: detail.product?.productName,
          quantity: detail.quantity,
          salePrice: detail.salePrice,
        })) || [],
    } as OrderDetailDto;
  }

  async deleteOrder(orderId: number) {
    const order = await this.orderRepository.findOne({ where: { orderId } });
    if (!order) throw new NotFoundException(ORDER_MESSAGES.NOT_FOUND ?? 'Không tìm thấy đơn hàng');

    if (order.status === 2 || order.status === 3) {
      throw new ForbiddenException('Không thể xóa đơn hàng ở trạng thái đã chấp nhận hoặc đang vận chuyển');
    }

    await this.orderRepository.delete({ orderId });
    return { message: SUCCESS_MESSAGES.DELETE_SUCCESS ?? 'Xóa đơn hàng thành công' };
  }

  private validateTransition(current: number, next: number) {
    const allowed: Record<number, number[]> = {
      1: [2, -2, -1],
      2: [3, -2, -1],
      3: [4, -2],
      4: [],
      '-2': [-1, 3],
      '-1': [],
    };

    const list = allowed[current] ?? [];
    return list.includes(next);
  }

  async updateStatus(user: any, orderId: number, dto: AdminUpdateStatusDto) {
    const { status: nextStatus, shipperId } = dto;
    const employeeId = user.userId;
    const roles = user.roles || [];
    const isAdmin = roles.includes('admin');

    const order = await this.orderRepository.findOne({ where: { orderId } });
    if (!order) throw new NotFoundException(ORDER_MESSAGES.NOT_FOUND ?? 'Không tìm thấy đơn hàng');

    const currentStatus = order.status;

    if (!this.validateTransition(currentStatus, nextStatus)) {
      throw new ForbiddenException('Không thể chuyển trạng thái theo luồng yêu cầu');
    }

    // Khi chấp nhận (2), gán nhân viên xử lý
    if (nextStatus === 2) {
      order.employeeId = employeeId;
      order.acceptTime = new Date();
    }

    // Logic can thiệp: Nếu là ADMIN thì được quyền ghi đè
    if (order.employeeId && order.employeeId !== employeeId && !isAdmin) {
      if (currentStatus !== 1) {
        throw new ForbiddenException('Chỉ nhân viên được gán hoặc ADMIN mới có quyền can thiệp đơn hàng này');
      }
    }

    // Sang vận chuyển (3), bắt buộc chọn shipper
    if (nextStatus === 3) {
      if (!shipperId) {
        throw new BadRequestException('Vui lòng chọn người giao hàng');
      }

      const shipper = await this.shipperRepository.findOne({ where: { shipperId } });
      if (!shipper) {
        throw new NotFoundException('Không tìm thấy người giao hàng');
      }

      order.shipperId = shipperId;
      order.shippedTime = new Date();
    }

    if (nextStatus === 4) {
      order.finishedTime = new Date();
    }

    order.status = nextStatus;

    await this.orderRepository.save(order);

    return {
      message: SUCCESS_MESSAGES.UPDATE_SUCCESS ?? 'Cập nhật trạng thái thành công',
      orderId,
      status: nextStatus,
    };
  }
}
