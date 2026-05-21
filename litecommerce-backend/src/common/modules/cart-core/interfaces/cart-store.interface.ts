export interface SessionCartItem {
    productId: number;
    quantity: number;
}

export interface ICartStore {
    get(key: string): Promise<SessionCartItem[]>;
    set(key: string, items: SessionCartItem[]): Promise<void>;
    delete(key: string): Promise<void>;
}

export const ICART_STORE = 'ICART_STORE';
