// src/lib/orderApi.js
// API functions cho quản lý đơn hàng khách hàng
import api from './api';

/**
 * Lấy danh sách đơn hàng của khách hàng hiện tại
 * @param {{ status?: number, page?: number, limit?: number }} params
 * @returns {{ orders: Order[], pagination: object }}
 */
export const getOrdersApi = (params = {}) =>
    api.get('/shop/orders', { params }).then((r) => r.data);

/**
 * Lấy chi tiết một đơn hàng
 * @param {number} id
 * @returns {OrderDetail}
 */
export const getOrderDetailApi = (id) =>
    api.get(`/shop/orders/${id}`).then((r) => r.data);

/**
 * Tạo đơn hàng mới từ giỏ hàng server session
 * @param {{ deliveryProvince: string, deliveryAddress: string }} data
 * @returns {{ message: string, orderId: number }}
 */
export const createOrderApi = (data) =>
    api.post('/shop/orders/create', data).then((r) => r.data);

/**
 * Khách hàng hủy đơn hàng (chỉ khi status là 1 hoặc 2)
 * @param {number} id
 */
export const cancelOrderApi = (id) =>
    api.post(`/shop/orders/cancel/${id}`).then((r) => r.data);
