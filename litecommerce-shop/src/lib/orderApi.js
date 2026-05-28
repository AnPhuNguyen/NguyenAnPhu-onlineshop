/**
 * src/lib/orderApi.js
 * API functions cho quản lý đơn hàng khách hàng
 */
import api from './api';

const logApiError = (label, err) => {
    console.error(`[orderApi][${label}] error`, {
        message: err?.message,
        status: err?.response?.status,
        url: err?.config?.url,
        method: err?.config?.method,
        data: err?.response?.data,
    });
};

/**
 * Lấy danh sách đơn hàng của khách hàng hiện tại
 * @param {{ status?: number, page?: number, limit?: number }} params
 * @returns {{ orders: Order[], pagination: object }}
 */
export const getOrdersApi = async (params = {}) => {
    console.log('[orderApi][getOrdersApi] request', { params });
    try {
        const r = await api.get('/shop/orders', { params });
        console.log('[orderApi][getOrdersApi] response', r?.data);
        return r.data;
    } catch (err) {
        logApiError('getOrdersApi', err);
        throw err;
    }
};

/**
 * Lấy chi tiết một đơn hàng
 * @param {number} id
 * @returns {OrderDetail}
 */
export const getOrderDetailApi = async (id) => {
    console.log('[orderApi][getOrderDetailApi] request', { id });
    try {
        const r = await api.get(`/shop/orders/${id}`);
        console.log('[orderApi][getOrderDetailApi] response', r?.data);
        return r.data;
    } catch (err) {
        logApiError('getOrderDetailApi', err);
        throw err;
    }
};

/**
 * Tạo đơn hàng mới từ giỏ hàng server session
 * @param {{ deliveryProvince: string, deliveryAddress: string }} data
 * @returns {{ message: string, orderId: number }}
 */
export const createOrderApi = async (data) => {
    console.log('[orderApi][createOrderApi] request', data);
    try {
        const r = await api.post('/shop/orders/create', data);
        console.log('[orderApi][createOrderApi] response', r?.data);
        return r.data;
    } catch (err) {
        logApiError('createOrderApi', err);
        throw err;
    }
};

/**
 * Khách hàng hủy đơn hàng (chỉ khi status là 1 hoặc 2)
 * @param {number} id
 */
export const cancelOrderApi = async (id) => {
    console.log('[orderApi][cancelOrderApi] request', { id });
    try {
        const r = await api.post(`/shop/orders/cancel/${id}`);
        console.log('[orderApi][cancelOrderApi] response', r?.data);
        return r.data;
    } catch (err) {
        logApiError('cancelOrderApi', err);
        throw err;
    }
};
