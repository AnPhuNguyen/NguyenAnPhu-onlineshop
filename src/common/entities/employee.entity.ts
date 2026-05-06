import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../../shop/entities/order.entity';

/**
 * Entity nhân viên
 * Lưu trữ thông tin nhân viên và quyền truy cập
 */
@Entity('Employees')
export class Employee {
  /**
   * ID nhân viên (Primary Key, Auto Increment)
   */
  @PrimaryGeneratedColumn({ type: 'int' })
  employeeId: number;

  /**
   * Họ tên đầy đủ của nhân viên
   */
  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  /**
   * Ngày sinh của nhân viên
   */
  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  /**
   * Địa chỉ của nhân viên
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
   * Link ảnh đại diện
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  photo: string;

  /**
   * Trạng thái làm việc (0: nghỉ, 1: đang làm)
   */
  @Column({ type: 'tinyint', nullable: true })
  isWorking: number;

  /**
   * Danh sách quyền (VD: "employee", "employee,admin")
   */
  @Column({ type: 'varchar', length: 500, nullable: true })
  roleNames: string;

  /**
   * Quan hệ một-nhiều với đơn hàng
   */
  @OneToMany(() => Order, order => order.employee)
  orders: Order[];
}
