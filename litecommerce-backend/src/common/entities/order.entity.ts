import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { Employee } from './employee.entity';
import { Shipper } from './shipper.entity';

/**
 * Entity đơn hàng
 * Lưu thông tin đơn hàng của khách hàng
 */
@Entity('Orders')
export class Order {
  /**
   * ID đơn hàng (Primary Key, Auto Increment)
   */
  @PrimaryGeneratedColumn({ type: 'int' })
  orderId: number;

  /**
   * ID khách hàng đặt hàng
   */
  @Column({ type: 'int', nullable: true })
  customerId: number;

  /**
   * Khách hàng liên quan đến đơn hàng
   */
  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'CustomerId' })
  customer: Customer;

  /**
   * Thời gian tạo đơn hàng
   */
  @Column({ type: 'datetime' })
  orderTime: Date;

  /**
   * Tỉnh/Thành phố giao hàng
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  deliveryProvince: string;

  /**
   * Địa chỉ giao hàng
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  deliveryAddress: string;

  /**
   * ID nhân viên xử lý đơn hàng
   */
  @Column({ type: 'int', nullable: true })
  employeeId: number;

  /**
   * Nhân viên xử lý đơn hàng
   */
  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'EmployeeID' })
  employee: Employee;

  /**
   * Thời gian chấp nhận đơn hàng
   */
  @Column({ type: 'datetime', nullable: true })
  acceptTime: Date;

  /**
   * ID người giao hàng
   */
  @Column({ type: 'int', nullable: true })
  shipperId: number;

  /**
   * Người giao hàng
   */
  @ManyToOne(() => Shipper)
  @JoinColumn({ name: 'ShipperID' })
  shipper: Shipper;

  /**
   * Thời gian bắt đầu giao hàng
   */
  @Column({ type: 'datetime', nullable: true })
  shippedTime: Date;

  /**
   * Thời gian hoàn thành đơn hàng
   */
  @Column({ type: 'datetime', nullable: true })
  finishedTime: Date;

  /**
   * Trạng thái đơn hàng
   * -2: Đơn hàng bị từ chối
   * -1: Đơn hàng đã bị hủy
   * 1: Đơn hàng vừa gửi/khởi tạo
   * 2: Đơn hàng đã chấp nhận
   * 3: Đơn hàng đang được vận chuyển
   * 4: Đơn hàng đã hoàn tất
   */
  @Column({ type: 'int' })
  status: number;
}
