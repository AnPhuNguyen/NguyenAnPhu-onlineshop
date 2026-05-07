import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';

/**
 * Entity danh mục sản phẩm
 * Phân loại sản phẩm theo nhóm (VD: Điện tử, Thời trang, Nhà cửa)
 */
@Entity('Categories')
export class Category {
  /**
   * ID danh mục (Primary Key, Auto Increment)
   */
  @PrimaryGeneratedColumn({ type: 'int' })
  categoryId: number;

  /**
   * Tên danh mục
   * Ví dụ: 'Điện tử', 'Thời trang'
   */
  @Column({ type: 'varchar', length: 255 })
  categoryName: string;

  /**
   * Mô tả chi tiết về danh mục
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  /**
   * Danh sách sản phẩm thuộc danh mục này
   */
  @OneToMany(() => Product, product => product.category)
  products: Product[];
}
