import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from '../../common/entities/customer.entity';
import { Product } from '../../common/entities/product.entity';

/**
 * Entity giỏ hàng
 * Lưu thông tin sản phẩm trong giỏ hàng của khách hàng
 */
@Entity('Carts')
export class Cart {
  /**
   * ID giỏ hàng (Primary Key, Auto Increment)
   */
  @PrimaryGeneratedColumn({ type: 'int' })
  cartId: number;

  /**
   * ID khách hàng
   */
  @Column({ type: 'int' })
  customerId: number;

  /**
   * ID sản phẩm
   */
  @Column({ type: 'int' })
  productId: number;

  /**
   * Số lượng
   */
  @Column({ type: 'int' })
  quantity: number;

  /**
   * Ngày thêm vào giỏ
   */
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  /**
 * Quan hệ với khách hàng
 */
@ManyToOne(() => Customer)
@JoinColumn({ name: 'customerId' })
customer: Customer;

/**
 * Quan hệ với sản phẩm
 */
@ManyToOne(() => Product)
@JoinColumn({ name: 'productId' })
product: Product;
}
