import { Injectable } from '@nestjs/common';
import { CartCoreService } from '../../common/modules/cart-core/cart-core.service';
import { AddToCartDto, CartResponseDto, CartItemDto } from './dto/cart.dto';

/**
 * Service xử lý logic cho giỏ hàng (shop)
 * Sử dụng CartCoreService để quản lý logic chung
 */
@Injectable()
export class ShopCartService {
  constructor(
    private readonly cartCoreService: CartCoreService,
  ) { }

  private getCartKey(userId: number): string {
    return `shop:${userId}`;
  }

  async getCart(userId: number): Promise<CartResponseDto> {
    const cart = await this.cartCoreService.getCart(this.getCartKey(userId));

    // eslint-disable-next-line no-console
    console.log('\n[shop-cart][getCart]\n', {
      userId,
      itemCount: cart?.itemCount,
      totalPrice: cart?.totalPrice,
    });

    return cart;
  }

  async addToCart(userId: number, addToCartDto: AddToCartDto): Promise<CartResponseDto> {
    // eslint-disable-next-line no-console
    console.log('\n[shop-cart][addToCart][request]\n', {
      userId,
      productId: addToCartDto?.productId,
      quantity: addToCartDto?.quantity,
    });

    const cart = await this.cartCoreService.addItem(
      this.getCartKey(userId),
      addToCartDto.productId,
      addToCartDto.quantity,
    );

    // eslint-disable-next-line no-console
    console.log('\n[shop-cart][addToCart][result]\n', {
      userId,
      itemCount: cart?.itemCount,
      totalPrice: cart?.totalPrice,
    });

    return cart;
  }

  async updateCartItem(userId: number, productId: number, quantity: number): Promise<CartResponseDto> {
    return this.cartCoreService.updateItem(this.getCartKey(userId), productId, quantity);
  }

  async removeCartItem(userId: number, productId: number): Promise<CartResponseDto> {
    return this.cartCoreService.removeItem(this.getCartKey(userId), productId);
  }

  clearCart(userId: number): void {
    this.cartCoreService.clearCart(this.getCartKey(userId));
  }

  async getRawCartItems(userId: number) {
    return this.cartCoreService.getRawItems(this.getCartKey(userId));
  }
}
