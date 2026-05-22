// src/lib/productApi.js
// API functions cho sản phẩm và danh mục (public, không cần xác thực)
import api from './api';

/**
 * Lấy danh sách sản phẩm có hỗ trợ tìm kiếm và lọc
 * @param {{ search?: string, categoryId?: number, minPrice?: number, maxPrice?: number, page?: number, limit?: number }} params
 * @returns {{ products: Product[], pagination: { page, limit, total, totalPages } }}
 */
export const getProductsApi = (params = {}) =>
    api.get('/shop/products', { params }).then((r) => r.data);

/**
 * Lấy chi tiết một sản phẩm theo ID
 * @param {number} id - ID sản phẩm
 * @returns {ProductDetail}
 */
export const getProductDetailApi = (id) =>
    api.get(`/shop/products/${id}`).then((r) => r.data);

/**
 * Lấy danh sách tất cả danh mục sản phẩm
 * @returns {Category[]}
 */
export const getCategoriesApi = () =>
    api.get('/shop/products/categories').then((r) => r.data);
