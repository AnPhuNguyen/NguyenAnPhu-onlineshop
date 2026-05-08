import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../common/entities/product.entity';
import { AddToCartDto, CartResponseDto, CartItemDto } from './dto/cart.dto';
import { CART_MESSAGES, PRODUCT_MESSAGES } from '../../common/constants/messages';

/**
 * Kiểu dữ liệu cho từng item trong giỏ hàng session
 */
interface SessionCartItem {
  productId: number;
  quantity: number;
}

/**
 * Service xử lý logic cho giỏ hàng (shop)
 * Giỏ hàng được lưu trong bộ nhớ server (in-memory Map) theo userId
 * Dữ liệu giỏ hàng sẽ mất khi server restart hoặc khách hàng đăng xuất
 */
@Injectable()
export class ShopCartService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  /**
   * In-memory store: Map<userId, danh sách sản phẩm trong giỏ>
   * Là singleton nên tồn tại suốt vòng đời của server
   */
  private cartStore = new Map<number, SessionCartItem[]>();

  /**
   * Lấy danh sách item trong giỏ của một user (raw, không join product)
   */
  private getCartItems(userId: number): SessionCartItem[] {
    return this.cartStore.get(userId) ?? [];
  }

  /**
   * Lấy thông tin giỏ hàng đầy đủ của khách hàng (có tên, giá sản phẩm)
   * @param userId - ID khách hàng từ JWT token
   * @returns Thông tin giỏ hàng gồm danh sách sản phẩm, tổng tiền, tổng số lượng
   */
  async getCart(userId: number): Promise<CartResponseDto> {
    const cartItems = this.getCartItems(userId);

    if (cartItems.length === 0) {
      return { items: [], totalPrice: 0, itemCount: 0 };
    }

    // Lấy thông tin sản phẩm từ DB theo danh sách productId trong giỏ
    const productIds = cartItems.map(item => item.productId);
    const products = await this.productRepository
      .createQueryBuilder('product')
      .where('product.productId IN (:...ids)', { ids: productIds })
      .getMany();

    // Map productId -> product để lookup nhanh
    const productMap = new Map(products.map(p => [p.productId, p]));

    const items: CartItemDto[] = cartItems
      .filter(item => productMap.has(item.productId)) // bỏ sản phẩm đã bị xóa khỏi DB
      .map(item => {
        const product = productMap.get(item.productId)!;
        const price = parseFloat(String(product.price));
        return {
          productId: item.productId,
          productName: product.productName,
          price,
          quantity: item.quantity,
          total: price * item.quantity,
        };
      });

    const totalPrice = items.reduce((sum, item) => sum + item.total, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return { items, totalPrice, itemCount };
  }

  /**
   * Thêm sản phẩm vào giỏ hàng
   * Nếu sản phẩm đã có trong giỏ thì cộng thêm số lượng
   * @param userId - ID khách hàng từ JWT token
   * @param addToCartDto - Thông tin sản phẩm và số lượng cần thêm
   * @returns Thông tin giỏ hàng sau khi thêm
   */
  async addToCart(userId: number, addToCartDto: AddToCartDto): Promise<CartResponseDto> {
    const { productId, quantity } = addToCartDto;

    // Kiểm tra sản phẩm có tồn tại và đang bán
    const product = await this.productRepository.findOne({
      where: { productId, isSelling: 1 },
    });

    if (!product) {
      throw new NotFoundException(PRODUCT_MESSAGES.NOT_FOUND);
    }

    if (quantity <= 0) {
      throw new BadRequestException(CART_MESSAGES.INVALID_QUANTITY);
    }

    const cartItems = this.getCartItems(userId);
    const existingItem = cartItems.find(item => item.productId === productId);

    if (existingItem) {
      // Cộng thêm số lượng nếu sản phẩm đã có trong giỏ
      existingItem.quantity += quantity;
    } else {
      // Thêm mới nếu chưa có
      cartItems.push({ productId, quantity });
    }

    this.cartStore.set(userId, cartItems);

    return this.getCart(userId);
  }

  /**
   * Cập nhật số lượng của một sản phẩm trong giỏ hàng
   * Nếu số lượng = 0 thì xóa sản phẩm khỏi giỏ
   * @param userId - ID khách hàng từ JWT token
   * @param productId - ID sản phẩm cần cập nhật
   * @param quantity - Số lượng mới
   * @returns Thông tin giỏ hàng sau khi cập nhật
   */
  async updateCartItem(userId: number, productId: number, quantity: number): Promise<CartResponseDto> {
    const cartItems = this.getCartItems(userId);
    const itemIndex = cartItems.findIndex(item => item.productId === productId);

    if (itemIndex === -1) {
      throw new NotFoundException('Sản phẩm không có trong giỏ hàng');
    }

    if (quantity <= 0) {
      // Xóa sản phẩm nếu số lượng về 0
      cartItems.splice(itemIndex, 1);
    } else {
      cartItems[itemIndex].quantity = quantity;
    }

    this.cartStore.set(userId, cartItems);

    return this.getCart(userId);
  }

  /**
   * Xóa một sản phẩm khỏi giỏ hàng
   * @param userId - ID khách hàng từ JWT token
   * @param productId - ID sản phẩm cần xóa
   * @returns Thông tin giỏ hàng sau khi xóa
   */
  async removeCartItem(userId: number, productId: number): Promise<CartResponseDto> {
    const cartItems = this.getCartItems(userId);
    const filtered = cartItems.filter(item => item.productId !== productId);

    if (filtered.length === cartItems.length) {
      throw new NotFoundException('Sản phẩm không có trong giỏ hàng');
    }

    this.cartStore.set(userId, filtered);

    return this.getCart(userId);
  }

  /**
   * Xóa toàn bộ giỏ hàng của khách hàng
   * Được gọi sau khi tạo đơn hàng thành công hoặc khi khách hàng đăng xuất
   * @param userId - ID khách hàng từ JWT token
   */
  clearCart(userId: number): void {
    this.cartStore.delete(userId);
  }

  /**
   * Lấy danh sách item thô trong giỏ (dùng nội bộ khi tạo đơn hàng)
   * @param userId - ID khách hàng
   * @returns Mảng { productId, quantity }
   */
  getRawCartItems(userId: number): SessionCartItem[] {
    return this.getCartItems(userId);
  }
}