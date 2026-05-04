// src/store/cartStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [], // [{ productId, productName, unit, price, photo, quantity }]

            addItem: (product, quantity = 1) => {
                set((state) => {
                    const existing = state.items.find((i) => i.productId === product.id);
                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                                i.productId === product.id
                                    ? { ...i, quantity: i.quantity + quantity }
                                    : i
                            ),
                        };
                    }
                    return {
                        items: [
                            ...state.items,
                            {
                                productId: product.id,
                                productName: product.name,
                                unit: product.unit,
                                price: product.price,
                                photo: product.photo,
                                quantity,
                            },
                        ],
                    };
                });
            },

            updateQuantity: (productId, quantity) => {
                if (quantity < 1) return;
                set((state) => ({
                    items: state.items.map((i) =>
                        i.productId === productId ? { ...i, quantity } : i
                    ),
                }));
            },

            removeItem: (productId) => {
                set((state) => ({
                    items: state.items.filter((i) => i.productId !== productId),
                }));
            },

            clearCart: () => {
                set({ items: [] });
            },

            getSubtotal: () => {
                return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            },

            getCount: () => {
                return get().items.length;
            },
        }),
        {
            name: 'litecommerce-cart',
        }
    )
);
