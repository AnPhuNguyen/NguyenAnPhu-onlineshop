import { Injectable, ForbiddenException } from '@nestjs/common';
import { OrderStatus } from './order-status.metadata';

/**
 * State machine xử lý các bước chuyển trạng thái của đơn hàng.
 * Đảm bảo tính nhất quán của luồng nghiệp vụ (1 -> 2 -> 3 -> 4).
 */
@Injectable()
export class OrderStateMachine {
    private readonly allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
        [OrderStatus.NEW]: [OrderStatus.ACCEPTED, OrderStatus.REJECTED, OrderStatus.CANCELED],
        [OrderStatus.ACCEPTED]: [OrderStatus.SHIPPING, OrderStatus.REJECTED, OrderStatus.CANCELED],
        [OrderStatus.SHIPPING]: [OrderStatus.FINISHED, OrderStatus.REJECTED],
        [OrderStatus.FINISHED]: [],
        [OrderStatus.REJECTED]: [OrderStatus.CANCELED, OrderStatus.SHIPPING], // -2 -> 3 theo guide
        [OrderStatus.CANCELED]: [],
    };

    /**
     * Kiểm tra xem việc chuyển từ current sang next có hợp lệ không.
     */
    isValidTransition(current: OrderStatus, next: OrderStatus): boolean {
        const list = this.allowedTransitions[current] ?? [];
        return list.includes(next);
    }

    /**
     * Kiểm tra quyền can thiệp vào đơn hàng.
     * @param orderStatus Trạng thái hiện tại.
     * @param actorId ID người thực hiện (Nhân viên).
     * @param responsibleEmployeeId ID nhân viên phụ trách đơn hàng.
     * @param isAdmin Có phải là Admin không.
     */
    canActorPerformTransition(
        orderStatus: OrderStatus,
        actorId: number,
        responsibleEmployeeId: number | null,
        isAdmin: boolean,
    ): boolean {
        // Nếu là đơn hàng mới (1), bất kỳ employee nào cũng có thể can thiệp (chấp nhận)
        if (orderStatus === OrderStatus.NEW) {
            return true;
        }

        // Nếu đã có người phụ trách, chỉ người đó hoặc Admin mới có quyền
        if (responsibleEmployeeId && responsibleEmployeeId !== actorId && !isAdmin) {
            return false;
        }

        return true;
    }
}
