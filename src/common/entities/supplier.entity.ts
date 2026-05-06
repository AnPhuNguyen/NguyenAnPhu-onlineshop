import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Entity nhà cung cấp
 * Lưu trữ thông tin các nhà cung cấp sản phẩm
 */
@Entity('Suppliers')
export class Supplier {
  /**
   * ID nhà cung cấp (Primary Key, Auto Increment)
   */
  @PrimaryGeneratedColumn({ type: 'int' })
  supplierId: number;

  /**
   * Tên nhà cung cấp
   */
  @Column({ type: 'varchar', length: 255 })
  supplierName: string;

  /**
   * Tên người liên hệ
   */
  @Column({ type: 'varchar', length: 255 })
  contactName: string;

  /**
   * Tỉnh/Thành phố
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  province: string;

  /**
   * Địa chỉ
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  /**
   * Số điện thoại
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  phone: string;

  /**
   * Email liên hệ
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;
}
