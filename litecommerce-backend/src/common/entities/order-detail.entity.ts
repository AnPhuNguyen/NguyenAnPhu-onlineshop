import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

/**
 * Entity chi tiết đơn hàng
 * Lưu trữ thông tin chi tiết các sản phẩm trong đơn hàng
 */
@Entity('OrderDetails')
export class OrderDetail {
  /**
   * ID đơn hàng (Primary Key - Composite)
   */
  @PrimaryColumn({ name: 'OrderID', type: 'int' })
  orderId: number;

  /**
   * ID sản phẩm (Primary Key - Composite)
   */
  @PrimaryColumn({ name: 'ProductID', type: 'int' })
  productId: number;

  /**
   * Số lượng
   */
  @Column({ name: 'Quantity', type: 'int' })
  quantity: number;

  /**
   * Giá bán tại thời điểm đặt hàng
   */
  @Column({ name: 'SalePrice', type: 'decimal', precision: 19, scale: 4 })
  salePrice: number;

  // Quan hệ
  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: 'OrderID' })
  order: Order;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'ProductID' })
  product: Product;
}
