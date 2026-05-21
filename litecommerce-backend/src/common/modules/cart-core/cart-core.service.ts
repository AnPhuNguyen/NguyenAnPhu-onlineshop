import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { ICART_STORE, SessionCartItem } from './interfaces/cart-store.interface';
import type { ICartStore } from './interfaces/cart-store.interface';
import { CART_MESSAGES, PRODUCT_MESSAGES } from '../../constants/messages';
import { CartResponseDto, CartItemDto } from '../../../shop/cart/dto/cart.dto';

/**
 * Deep module for Cart operations.
 * Handles identity-agnostic cart management with live pricing and availability checks.
 */
@Injectable()
export class CartCoreService {
    constructor(
        @Inject(ICART_STORE)
        private readonly cartStore: ICartStore,

        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    /**
     * Retrieves the full cart with calculations.
     */
    async getCart(cartKey: string): Promise<CartResponseDto> {
        const cartItems = await this.cartStore.get(cartKey);

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

    /**
     * Adds an item to the cart after validating availability.
     * @param cartKey - Prefix-agnostic key
     * @param productId 
     * @param quantity 
     */
    async addItem(cartKey: string, productId: number, quantity: number): Promise<CartResponseDto> {
        if (quantity <= 0) {
            throw new BadRequestException(CART_MESSAGES.INVALID_QUANTITY);
        }

        // Invariant: Product must exist and be selling
        const product = await this.productRepository.findOne({
            where: { productId, isSelling: 1 },
        });

        if (!product) {
            throw new NotFoundException(PRODUCT_MESSAGES.NOT_FOUND);
        }

        const cartItems = await this.cartStore.get(cartKey);
        const existingItem = cartItems.find((item) => item.productId === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cartItems.push({ productId, quantity });
        }

        await this.cartStore.set(cartKey, cartItems);

        return this.getCart(cartKey);
    }

    /**
     * Updates item quantity or removes if quantity <= 0.
     */
    async updateItem(cartKey: string, productId: number, quantity: number): Promise<CartResponseDto> {
        const cartItems = await this.cartStore.get(cartKey);
        const itemIndex = cartItems.findIndex((item) => item.productId === productId);

        if (itemIndex === -1) {
            throw new NotFoundException('Sản phẩm không có trong giỏ hàng');
        }

        if (quantity <= 0) {
            cartItems.splice(itemIndex, 1);
        } else {
            cartItems[itemIndex].quantity = quantity;
        }

        await this.cartStore.set(cartKey, cartItems);

        return this.getCart(cartKey);
    }

    /**
     * Removes specific item.
     */
    async removeItem(cartKey: string, productId: number): Promise<CartResponseDto> {
        const cartItems = await this.cartStore.get(cartKey);
        const filtered = cartItems.filter((item) => item.productId !== productId);

        if (filtered.length === cartItems.length) {
            throw new NotFoundException('Sản phẩm không có trong giỏ hàng');
        }

        await this.cartStore.set(cartKey, filtered);

        return this.getCart(cartKey);
    }

    async clearCart(cartKey: string): Promise<void> {
        await this.cartStore.delete(cartKey);
    }

    async getRawItems(cartKey: string): Promise<SessionCartItem[]> {
        return this.cartStore.get(cartKey);
    }
}
