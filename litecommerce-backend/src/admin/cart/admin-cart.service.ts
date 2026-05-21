import { Injectable } from '@nestjs/common';
import { CartCoreService } from '../../common/modules/cart-core/cart-core.service';
import { AddToCartDto, CartResponseDto } from '../../shop/cart/dto/cart.dto';

/**
 * Service xử lý logic giỏ hàng cho Admin
 * Sử dụng CartCoreService để quản lý logic chung
 */
@Injectable()
export class AdminCartService {
  constructor(
    private readonly cartCoreService: CartCoreService,
  ) { }

  private getCartKey(employeeId: number): string {
    return `admin:${employeeId}`;
  }

  async getCart(employeeId: number): Promise<CartResponseDto> {
    return this.cartCoreService.getCart(this.getCartKey(employeeId));
  }

  async addToCart(
    employeeId: number,
    addToCartDto: AddToCartDto,
  ): Promise<CartResponseDto> {
    return this.cartCoreService.addItem(
      this.getCartKey(employeeId),
      addToCartDto.productId,
      addToCartDto.quantity,
    );
  }

  async updateCartItem(
    employeeId: number,
    productId: number,
    quantity: number,
  ): Promise<CartResponseDto> {
    return this.cartCoreService.updateItem(this.getCartKey(employeeId), productId, quantity);
  }

  async removeCartItem(
    employeeId: number,
    productId: number,
  ): Promise<CartResponseDto> {
    return this.cartCoreService.removeItem(this.getCartKey(employeeId), productId);
  }

  clearCart(employeeId: number): void {
    this.cartCoreService.clearCart(this.getCartKey(employeeId));
  }

  async getRawCartItems(employeeId: number) {
    return this.cartCoreService.getRawItems(this.getCartKey(employeeId));
  }
}
