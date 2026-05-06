import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Customer } from '../../common/entities/customer.entity';
import { Employee } from '../../common/entities/employee.entity';
import { Shipper } from '../../common/entities/shipper.entity';
import { OrderStatus } from '../../common/entities/order-status.entity';
import { OrderDetail } from '../../common/entities/order-detail.entity';

/**
 * Entity đơn hàng
 * Lưu trữ thông tin đơn hàng của khách hàng
 */
@Entity('Orders')
export class Order {
  /**
   * ID đơn hàng (Primary Key, Auto Increment)
   */
  @PrimaryGeneratedColumn({ type: 'int' })
  orderId: number;

  /**
   * ID khách hàng (Foreign Key)
   */
  @Column({ type: 'int', nullable: true })
  customerId: number;

  /**
   * Thời điểm tạo đơn hàng
   */
  @Column({ type: 'datetime' })
  orderTime: Date;

  /**
   * Tỉnh giao hàng
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  deliveryProvince: string;

  /**
   * Địa chỉ giao hàng
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  deliveryAddress: string;

  /**
   * ID nhân viên xử lý (Foreign Key)
   */
  @Column({ type: 'int', nullable: true })
  employeeId: number;

  /**
   * Thời điểm chấp nhận đơn hàng
   */
  @Column({ type: 'datetime', nullable: true })
  acceptTime: Date;

  /**
   * ID người giao hàng (Foreign Key)
   */
  @Column({ type: 'int', nullable: true })
  shipperId: number;

  /**
   * Thời điểm bắt đầu vận chuyển
   */
  @Column({ type: 'datetime', nullable: true })
  shippedTime: Date;

  /**
   * Thời điểm hoàn tất
   */
  @Column({ type: 'datetime', nullable: true })
  finishedTime: Date;

  /**
   * Trạng thái đơn hàng
   * -2: Bị từ chối, -1: Bị hủy
   * 1: Mới, 2: Đã chấp nhận, 3: Đang vận chuyển, 4: Hoàn tất
   */
  @Column({ type: 'int' })
  status: number;

  // Quan hệ
  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;

  @ManyToOne(() => Shipper)
  @JoinColumn({ name: 'shipperId' })
  shipper: Shipper;

  @ManyToOne(() => OrderStatus)
  @JoinColumn({ name: 'status' })
  orderStatus: OrderStatus;

  @OneToMany(() => OrderDetail, detail => detail.order)
  orderDetails: OrderDetail[];
}
