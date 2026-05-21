import { Injectable } from '@nestjs/common';
import { ICartStore, SessionCartItem } from '../interfaces/cart-store.interface';

/**
 * Implementation of ICartStore using an in-memory Map.
 * Note: Data is lost on server restart.
 */
@Injectable()
export class MemoryCartStore implements ICartStore {
    private cartStore = new Map<string, SessionCartItem[]>();

    async get(key: string): Promise<SessionCartItem[]> {
        return this.cartStore.get(key) ?? [];
    }

    async set(key: string, items: SessionCartItem[]): Promise<void> {
        this.cartStore.set(key, items);
    }

    async delete(key: string): Promise<void> {
        this.cartStore.delete(key);
    }
}
