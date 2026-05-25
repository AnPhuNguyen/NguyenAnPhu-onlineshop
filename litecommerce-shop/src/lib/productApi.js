/**
 * src/lib/productApi.js
 * API functions cho sản phẩm và danh mục (public, không cần xác thực)
 */
import api from './api';

const logApiError = (label, err) => {
    console.error(`[productApi][${label}] error`, {
        message: err?.message,
        status: err?.response?.status,
        url: err?.config?.url,
        method: err?.config?.method,
        data: err?.response?.data,
    });
};

/**
 * Lấy danh sách sản phẩm có hỗ trợ tìm kiếm và lọc
 * @param {{ search?: string, categoryId?: number, minPrice?: number, maxPrice?: number, page?: number, limit?: number }} params
 * @returns {{ products: Product[], pagination: { page, limit, total, totalPages } }}
 */
export const getProductsApi = async (params = {}) => {
    console.log('[productApi][getProductsApi] request', { params });
    try {
        const r = await api.get('/shop/products', { params });
        console.log('[productApi][getProductsApi] response', r?.data);
        return r.data;
    } catch (err) {
        logApiError('getProductsApi', err);
        throw err;
    }
};

/**
 * Lấy chi tiết một sản phẩm theo ID
 * @param {number} id - ID sản phẩm
 * @returns {ProductDetail}
 */
export const getProductDetailApi = async (id) => {
    console.log('[productApi][getProductDetailApi] request', { id });
    try {
        const r = await api.get(`/shop/products/${id}`);
        console.log('[productApi][getProductDetailApi] response', r?.data);
        // backend trả về dạng: { success, data, message }
        // frontend ProductDetail.jsx kỳ vọng nhận trực tiếp object product
        return r?.data?.data ?? r.data;
    } catch (err) {
        logApiError('getProductDetailApi', err);
        throw err;
    }
};

/**
 * Lấy danh sách tất cả danh mục sản phẩm
 * @returns {Category[]}
 */
export const getCategoriesApi = async () => {
    console.log('[productApi][getCategoriesApi] request');
    try {
        const r = await api.get('/shop/products/categories');
        console.log('[productApi][getCategoriesApi] response', r?.data);
        return r.data;
    } catch (err) {
        logApiError('getCategoriesApi', err);
        throw err;
    }
};
