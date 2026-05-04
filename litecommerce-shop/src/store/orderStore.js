// src/store/orderStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MOCK_ORDERS } from '../data/mockData';

export const useOrderStore = create(
    persist(
        (set, get) => ({
            orders: MOCK_ORDERS,

            createOrder: ({ customerId, items, deliveryProvince, deliveryAddress }) => {
                const newOrder = {
                    id: Date.now(),
                    status: 1,
                    orderTime: new Date().toISOString(),
                    acceptTime: null,
                    shippedTime: null,
                    finishedTime: null,
                    deliveryProvince,
                    deliveryAddress,
                    details: items.map((item) => ({
                        productId: item.productId,
                        productName: item.productName,
                        quantity: item.quantity,
                        salePrice: item.price,
                        photo: item.photo,
                    })),
                };
                set((state) => ({ orders: [newOrder, ...state.orders] }));
                return newOrder;
            },

            cancelOrder: (orderId) => {
                set((state) => ({
                    orders: state.orders.map((o) =>
                        o.id === orderId && (o.status === 1 || o.status === 2)
                            ? { ...o, status: -1 }
                            : o
                    ),
                }));
            },

            getOrderById: (id) => {
                return get().orders.find((o) => o.id === Number(id));
            },

            getOrdersByCustomer: () => {
                return get().orders;
            },
        }),
        {
            name: 'litecommerce-orders',
        }
    )
);
