import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Customer } from './customer.entity';
import { Employee } from './employee.entity';
import { Shipper } from './shipper.entity';
import { OrderDetail } from './order-detail.entity';

/**
 * Entity đơn hàng
 * Lưu trữ thông tin đơn hàng của khách hàng
 */
@Entity('Orders')
export class Order {
  /**
   * ID đơn hàng (Primary Key, Auto Increment)
   */
  @PrimaryGeneratedColumn({ name: 'OrderID', type: 'int' })
  orderId: number;

  /**
   * ID khách hàng đặt hàng
   */
  @Column({ name: 'CustomerID', type: 'int', nullable: true })
  customerId: number;

  /**
   * Khách hàng liên quan đến đơn hàng
   */
  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'CustomerID' })
  customer: Customer;

  /**
   * Thời gian tạo đơn hàng
   */
  @Column({ name: 'OrderTime', type: 'datetime' })
  orderTime: Date;

  /**
   * Tỉnh/Thành phố giao hàng
   */
  @Column({ name: 'DeliveryProvince', type: 'varchar', length: 255, nullable: true })
  deliveryProvince: string;

  /**
   * Địa chỉ giao hàng
   */
  @Column({ name: 'DeliveryAddress', type: 'varchar', length: 255, nullable: true })
  deliveryAddress: string;

  /**
   * ID nhân viên xử lý đơn hàng
   */
  @Column({ name: 'EmployeeID', type: 'int', nullable: true })
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
  @Column({ name: 'AcceptTime', type: 'datetime', nullable: true })
  acceptTime: Date;

  /**
   * ID người giao hàng
   */
  @Column({ name: 'ShipperID', type: 'int', nullable: true })
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
  @Column({ name: 'ShippedTime', type: 'datetime', nullable: true })
  shippedTime: Date;

  /**
   * Thời gian hoàn thành đơn hàng
   */
  @Column({ name: 'FinishedTime', type: 'datetime', nullable: true })
  finishedTime: Date;

  /**
   * Trạng thái đơn hàng
   */
  @Column({ name: 'Status', type: 'int' })
  status: number;

  /**
   * Chi tiết đơn hàng
   */
  @OneToMany(() => OrderDetail, (detail) => detail.order)
  orderDetails: OrderDetail[];
}
