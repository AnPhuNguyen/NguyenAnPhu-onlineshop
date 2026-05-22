// src/store/orderStore.js
// Quản lý trạng thái đơn hàng của khách hàng – đồng bộ với backend.
import { create } from 'zustand';
import { createOrderApi, cancelOrderApi } from '../lib/orderApi';

/**
 * Store đơn hàng – chủ yếu xử lý các hành động (actions) như tạo và hủy đơn.
 * Danh sách đơn hàng nên được tải qua React Query trong component để có cache tốt hơn,
 * nhưng ta giữ lại các phương thức này để đồng bộ với UI hiện tại.
 */
export const useOrderStore = create((set) => ({
    loading: false,
    error: null,

    /**
     * Tạo đơn hàng mới từ giỏ hàng hiện tại trên server
     * @param {{ deliveryProvince: string, deliveryAddress: string }} data
     */
    createOrder: async (data) => {
        set({ loading: true, error: null });
        try {
            const response = await createOrderApi(data);
            return { success: true, orderId: response.orderId };
        } catch (err) {
            const message = err.response?.data?.message || 'Không thể đặt hàng';
            set({ error: message });
            return { success: false, message };
        } finally {
            set({ loading: false });
        }
    },

    /**
     * Hủy đơn hàng thông qua API
     * @param {number} orderId
     */
    cancelOrder: async (orderId) => {
        try {
            await cancelOrderApi(orderId);
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Không thể hủy đơn hàng';
            return { success: false, message };
        }
    },
}));
