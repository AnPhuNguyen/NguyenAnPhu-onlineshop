import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Entity người giao hàng
 * Lưu trữ thông tin các đơn vị vận chuyển
 */
@Entity('Shippers')
export class Shipper {
  /**
   * ID người giao hàng (Primary Key, Auto Increment)
   */
  @PrimaryGeneratedColumn({ type: 'int' })
  shipperId: number;

  /**
   * Tên đơn vị vận chuyển
   */
  @Column({ type: 'varchar', length: 255 })
  shipperName: string;

  /**
   * Số điện thoại liên hệ
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  phone: string;
}
