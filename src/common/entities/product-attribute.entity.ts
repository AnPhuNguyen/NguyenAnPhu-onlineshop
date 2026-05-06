import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

/**
 * Entity thuộc tính sản phẩm
 * Lưu trữ các thuộc tính chi tiết của sản phẩm
 */
@Entity('ProductAttributes')
export class ProductAttribute {
  /**
   * ID thuộc tính (Primary Key, Auto Increment)
   */
  @PrimaryGeneratedColumn({ type: 'bigint' })
  attributeId: number;

  /**
   * ID sản phẩm (Foreign Key)
   */
  @Column({ type: 'int' })
  productId: number;

  /**
   * Tên thuộc tính (VD: Màu sắc, Kích thước)
   */
  @Column({ type: 'varchar', length: 255 })
  attributeName: string;

  /**
   * Giá trị thuộc tính (VD: Đen, Trắng, XL)
   */
  @Column({ type: 'longtext' })
  attributeValue: string;

  /**
   * Thứ tự hiển thị
   */
  @Column({ type: 'int' })
  displayOrder: number;

  // Quan hệ
  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
