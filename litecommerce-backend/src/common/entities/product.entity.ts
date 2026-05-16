import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { Supplier } from './supplier.entity';
import { ProductAttribute } from './product-attribute.entity';
import { ProductPhoto } from './product-photo.entity';
import { OrderDetail } from './order-detail.entity';

/**
 * Entity sản phẩm
 * Lưu trữ thông tin chi tiết sản phẩm
 */
@Entity('Products')
export class Product {
  /**
   * ID sản phẩm (Primary Key, Auto Increment)
   */
  @PrimaryGeneratedColumn({ type: 'int' })
  productId: number;

  /**
   * Tên sản phẩm
   */
  @Column({ type: 'varchar', length: 255 })
  productName: string;

  /**
   * Mô tả chi tiết sản phẩm
   */
  @Column({ type: 'varchar', length: 2000, nullable: true })
  productDescription: string;

  /**
   * ID nhà cung cấp (Foreign Key)
   */
  @Column({ type: 'int', nullable: true })
  supplierId: number;

  /**
   * ID danh mục (Foreign Key)
   */
  @Column({ type: 'int', nullable: true })
  categoryId: number;

  /**
   * Đơn vị tính (VD: cái, hộp, chiếc)
   */
  @Column({ type: 'varchar', length: 255 })
  unit: string;

  /**
   * Giá bán
   */
  @Column({ type: 'decimal', precision: 19, scale: 4 })
  price: number;

  /**
   * Link ảnh đại diện
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  photo: string;

  /**
   * Trạng thái bán (0: ngừng, 1: đang bán)
   */
  @Column({ type: 'tinyint' })
  isSelling: number;

  // Quan hệ
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(() => Supplier)
  @JoinColumn({ name: 'supplierId' })
  supplier: Supplier;

  @OneToMany(() => ProductAttribute, attr => attr.product)
  attributes: ProductAttribute[];

  @OneToMany(() => ProductPhoto, photo => photo.product)
  photos: ProductPhoto[];

  @OneToMany(() => OrderDetail, detail => detail.product)
  orderDetails: OrderDetail[];
}
