import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

/**
 * Entity ảnh sản phẩm
 * Lưu trữ thư viện ảnh của sản phẩm
 */
@Entity('ProductPhotos')
export class ProductPhoto {
  /**
   * ID ảnh (Primary Key, Auto Increment)
   */
  @PrimaryGeneratedColumn({ type: 'bigint' })
  photoId: number;

  /**
   * ID sản phẩm (Foreign Key)
   */
  @Column({ type: 'int' })
  productId: number;

  /**
   * Tên file ảnh
   */
  @Column({ type: 'varchar', length: 255 })
  photo: string;

  /**
   * Mô tả ảnh
   */
  @Column({ type: 'varchar', length: 255 })
  description: string;

  /**
   * Thứ tự hiển thị
   */
  @Column({ type: 'int' })
  displayOrder: number;

  /**
   * Trạng thái ẩn (0: hiện, 1: ẩn)
   */
  @Column({ type: 'tinyint' })
  isHidden: number;

  // Quan hệ
  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
