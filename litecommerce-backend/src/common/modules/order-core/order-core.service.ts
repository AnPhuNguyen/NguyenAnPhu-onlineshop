import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../entities/order.entity';
import { OrderDetail } from '../../entities/order-detail.entity';
import { Product } from '../../entities/product.entity';
import { OrderStateMachine } from './order-state-machine';
import { OrderStatus, ORDER_STATUS_DETAILS } from './order-status.metadata';
import { ORDER_MESSAGES } from '../../constants/messages';

/**
 * Service cốt lõi quản lý vòng đời đơn hàng (Order Lifecycle).
 * Đảm bảo snapshot giá bán, quản lý state machine và tự động cập nhật thời gian.
 */
@Injectable()
export class OrderCoreService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,

        @InjectRepository(OrderDetail)
        private readonly orderDetailRepository: Repository<OrderDetail>,

        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        private readonly stateMachine: OrderStateMachine,
    ) { }

    /**
     * Khởi tạo đơn hàng mới với việc Snapshot giá từ Catalog.
     */
    async createOrder(data: {
        customerId: number;
        deliveryProvince: string;
        deliveryAddress: string;
        items: { productId: number; quantity: number }[];
    }): Promise<Order> {
        const { customerId, deliveryProvince, deliveryAddress, items } = data;

        if (!items || items.length === 0) {
            throw new BadRequestException('Đơn hàng không có sản phẩm');
        }

        // 1. Snapshot logic: Lấy giá hiện tại từ database
        const productIds = items.map(i => i.productId);
        const products = await this.productRepository
            .createQueryBuilder('p')
            .where('p.productId IN (:...ids) AND p.isSelling = 1', { ids: productIds })
            .getMany();

        if (products.length !== items.length) {
            throw new NotFoundException('Một số sản phẩm không tồn tại hoặc đã ngừng bán');
        }

        const priceMap = new Map(products.map(p => [p.productId, Number(p.price)]));

        // 2. Tạo đơn hàng (Trạng thái mặc định: NEW = 1)
        const order = this.orderRepository.create({
            customerId,
            deliveryProvince,
            deliveryAddress,
            orderTime: new Date(),
            status: OrderStatus.NEW,
        });

        const savedOrder = await this.orderRepository.save(order);

        // 3. Tạo chi tiết đơn hàng với snapshot SalePrice
        const details = items.map(item => {
            const salePrice = priceMap.get(item.productId)!;
            return this.orderDetailRepository.create({
                orderId: savedOrder.orderId,
                productId: item.productId,
                quantity: item.quantity,
                salePrice: salePrice, // Snapshot price here
            });
        });

        await this.orderDetailRepository.save(details);
        return savedOrder;
    }

    /**
     * Cập nhật trạng thái đơn hàng. Thực thi State Machine và ghi log thời gian.
     */
    async updateStatus(params: {
        orderId: number;
        nextStatus: OrderStatus;
        actorId: number;
        actorRoles: string[];
        shipperId?: number;
    }): Promise<Order> {
        const { orderId, nextStatus, actorId, actorRoles, shipperId } = params;
        const isAdmin = actorRoles.includes('admin');

        const order = await this.orderRepository.findOne({ where: { orderId } });
        if (!order) throw new NotFoundException(ORDER_MESSAGES.NOT_FOUND);

        // 1. Kiểm tra State Machine
        if (!this.stateMachine.isValidTransition(order.status as OrderStatus, nextStatus)) {
            throw new ForbiddenException(`Không thể chuyển từ "${ORDER_STATUS_DETAILS[order.status].vietnameseLabel}" sang "${ORDER_STATUS_DETAILS[nextStatus].vietnameseLabel}"`);
        }

        // 2. Kiểm tra Ownership/Responsible Employee
        if (!this.stateMachine.canActorPerformTransition(order.status as OrderStatus, actorId, order.employeeId, isAdmin)) {
            throw new ForbiddenException('Chỉ nhân viên phụ trách hoặc ADMIN mới có quyền can thiệp vào đơn hàng này');
        }

        // 3. Tự động cập nhật metadata/timestamps dựa trên status mới
        const now = new Date();
        switch (nextStatus) {
            case OrderStatus.ACCEPTED:
                order.employeeId = actorId; // Gán nhân viên phụ trách khi chấp nhận
                order.acceptTime = now;
                break;
            case OrderStatus.SHIPPING:
                if (!shipperId) throw new BadRequestException('Vui lòng chọn người giao hàng');
                order.shipperId = shipperId;
                order.shippedTime = now;
                break;
            case OrderStatus.FINISHED:
                order.finishedTime = now;
                break;
        }

        order.status = nextStatus;
        return this.orderRepository.save(order);
    }

    /**
     * Hủy đơn hàng (thường dùng cho khách hàng).
     */
    async customerCancel(orderId: number, customerId: number): Promise<Order> {
        const order = await this.orderRepository.findOne({ where: { orderId, customerId } });
        if (!order) throw new NotFoundException(ORDER_MESSAGES.NOT_FOUND);

        // Khách hàng chỉ có thể hủy ở trạng thái 1, 2
        if (order.status !== OrderStatus.NEW && order.status !== OrderStatus.ACCEPTED) {
            throw new ForbiddenException('Không thể hủy đơn hàng ở giai đoạn này');
        }

        order.status = OrderStatus.CANCELED;
        return this.orderRepository.save(order);
    }

    /**
     * Lấy mô tả tiếng Việt của trạng thái.
     */
    getStatusLabel(status: number): string {
        return ORDER_STATUS_DETAILS[status as OrderStatus]?.vietnameseLabel || 'Không xác định';
    }
}
