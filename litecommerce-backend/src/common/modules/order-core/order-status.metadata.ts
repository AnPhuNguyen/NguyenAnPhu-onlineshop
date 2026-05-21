/**
 * Định nghĩa các trạng thái đơn hàng (Order Status) và metadata liên quan.
 * Bám sát theo tài liệu nghiệp vụ LiteCommerce.
 */
export enum OrderStatus {
    REJECTED = -2,
    CANCELED = -1,
    NEW = 1,
    ACCEPTED = 2,
    SHIPPING = 3,
    FINISHED = 4,
}

export interface OrderStatusMetadata {
    status: OrderStatus;
    description: string;
    vietnameseLabel: string;
}

export const ORDER_STATUS_DETAILS: Record<OrderStatus, OrderStatusMetadata> = {
    [OrderStatus.REJECTED]: {
        status: OrderStatus.REJECTED,
        description: 'Rejected',
        vietnameseLabel: 'Đơn hàng bị từ chối',
    },
    [OrderStatus.CANCELED]: {
        status: OrderStatus.CANCELED,
        description: 'Canceled',
        vietnameseLabel: 'Đơn hàng đã bị hủy',
    },
    [OrderStatus.NEW]: {
        status: OrderStatus.NEW,
        description: 'New',
        vietnameseLabel: 'Đơn hàng vừa gửi/khởi tạo',
    },
    [OrderStatus.ACCEPTED]: {
        status: OrderStatus.ACCEPTED,
        description: 'Accepted',
        vietnameseLabel: 'Đơn hàng đã chấp nhận',
    },
    [OrderStatus.SHIPPING]: {
        status: OrderStatus.SHIPPING,
        description: 'Shipping',
        vietnameseLabel: 'Đơn hàng đang được vận chuyển',
    },
    [OrderStatus.FINISHED]: {
        status: OrderStatus.FINISHED,
        description: 'Finished',
        vietnameseLabel: 'Đơn hàng đã hoàn tất',
    },
};
