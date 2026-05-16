import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../common/entities/product.entity';
import {
  AddToCartDto,
  CartResponseDto,
  CartItemDto,
} from '../../shop/cart/dto/cart.dto';
import { CART_MESSAGES, PRODUCT_MESSAGES } from '../../common/constants/messages';

interface SessionCartItem {
  productId: number;
  quantity: number;
}

/**
 * Service xử lý logic giỏ hàng cho Admin
 * - Session-based theo employeeId (lưu in-memory Map)
 */
@Injectable()
export class AdminCartService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // In-memory store: Map<employeeId, items>
  private cartStore = new Map<number, SessionCartItem[]>();

  private getCartItems(employeeId: number): SessionCartItem[] {
    return this.cartStore.get(employeeId) ?? [];
  }

  private setCartItems(employeeId: number, items: SessionCartItem[]) {
    this.cartStore.set(employeeId, items);
  }

  async getCart(employeeId: number): Promise<CartResponseDto> {
    const cartItems = this.getCartItems(employeeId);

    if (cartItems.length === 0) {
      return { items: [], totalPrice: 0, itemCount: 0 };
    }

    const productIds = cartItems.map((i) => i.productId);

    const products = await this.productRepository
      .createQueryBuilder('product')
      .where('product.productId IN (:...ids)', { ids: productIds })
      .getMany();

    const productMap = new Map(products.map((p) => [p.productId, p]));

    const items: CartItemDto[] = cartItems
      .filter((item) => productMap.has(item.productId))
      .map((item) => {
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

  async addToCart(
    employeeId: number,
    addToCartDto: AddToCartDto,
  ): Promise<CartResponseDto> {
    const { productId, quantity } = addToCartDto;

    const product = await this.productRepository.findOne({
      where: { productId, isSelling: 1 },
    });

    if (!product) {
      throw new NotFoundException(PRODUCT_MESSAGES.NOT_FOUND);
    }

    if (quantity <= 0) {
      throw new BadRequestException(CART_MESSAGES.INVALID_QUANTITY);
    }

    const cartItems = this.getCartItems(employeeId);
    const existingItem = cartItems.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({ productId, quantity });
    }

    this.setCartItems(employeeId, cartItems);

    return this.getCart(employeeId);
  }

  async updateCartItem(
    employeeId: number,
    productId: number,
    quantity: number,
  ): Promise<CartResponseDto> {
    const cartItems = this.getCartItems(employeeId);
    const itemIndex = cartItems.findIndex((item) => item.productId === productId);

    if (itemIndex === -1) {
      throw new NotFoundException('Sản phẩm không có trong giỏ hàng');
    }

    if (quantity <= 0) {
      cartItems.splice(itemIndex, 1);
    } else {
      cartItems[itemIndex].quantity = quantity;
    }

    this.setCartItems(employeeId, cartItems);

    return this.getCart(employeeId);
  }

  async removeCartItem(
    employeeId: number,
    productId: number,
  ): Promise<CartResponseDto> {
    const cartItems = this.getCartItems(employeeId);
    const filtered = cartItems.filter((item) => item.productId !== productId);

    if (filtered.length === cartItems.length) {
      throw new NotFoundException('Sản phẩm không có trong giỏ hàng');
    }

    this.setCartItems(employeeId, filtered);

    return this.getCart(employeeId);
  }

  clearCart(employeeId: number): void {
    this.cartStore.delete(employeeId);
  }

  getRawCartItems(employeeId: number): SessionCartItem[] {
    return this.getCartItems(employeeId);
  }
}
