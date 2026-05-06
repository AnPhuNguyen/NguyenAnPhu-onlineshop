import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../../shop/entities/order.entity';

/**
 * Entity khách hàng
 * Lưu trữ thông tin khách hàng đăng ký và mua hàng
 */
@Entity('Customers')
export class Customer {
  /**
   * ID khách hàng (Primary Key, Auto Increment)
   */
  @PrimaryGeneratedColumn({ type: 'int' })
  customerId: number;

  /**
   * Tên đầy đủ của khách hàng
   */
  @Column({ type: 'varchar', length: 255 })
  customerName: string;

  /**
   * Tên liên hệ (hiện tại bằng customerName)
   */
  @Column({ type: 'varchar', length: 255 })
  contactName: string;

  /**
   * Tỉnh/Thành phố của khách hàng
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  province: string;

  /**
   * Địa chỉ chi tiết của khách hàng
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  /**
   * Số điện thoại liên hệ
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  phone: string;

  /**
   * Email đăng nhập (Unique)
   */
  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  /**
   * Mật khẩu (đã hash MD5)
   */
  @Column({ type: 'varchar', length: 50 })
  password: string;

  /**
   * Trạng thái khóa tài khoản (0: hoạt động, 1: bị khóa)
   */
  @Column({ type: 'tinyint', nullable: true })
  isLocked: number;

  /**
   * Quan hệ một-nhiều với đơn hàng
   */
  @OneToMany(() => Order, order => order.customer)
  orders: Order[];
}
