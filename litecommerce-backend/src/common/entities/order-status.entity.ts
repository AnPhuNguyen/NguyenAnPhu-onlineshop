import { Entity, PrimaryColumn, Column } from 'typeorm';

/**
 * Entity trạng thái đơn hàng
 * Định nghĩa các trạng thái của đơn hàng trong hệ thống
 */
@Entity('OrderStatus')
export class OrderStatus {
  /**
   * Mã trạng thái (Primary Key)
   * -2: Bị từ chối, -1: Bị hủy
   * 1: Mới, 2: Đã chấp nhận, 3: Đang vận chuyển, 4: Hoàn tất
   */
  @PrimaryColumn({ type: 'int' })
  status: number;

  /**
   * Mô tả trạng thái
   */
  @Column({ type: 'varchar', length: 50 })
  description: string;
}
