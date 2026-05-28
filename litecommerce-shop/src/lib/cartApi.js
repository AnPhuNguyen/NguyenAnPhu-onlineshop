// src/lib/cartApi.js
// API functions cho giỏ hàng (yêu cầu xác thực với role customer)
import api from './api';

/**
 * Lấy thông tin giỏ hàng hiện tại từ server session
 * @returns {{ items: CartItem[], totalPrice: number, itemCount: number }}
 */
export const getCartApi = () =>
    api.get('/shop/cart').then((r) => r.data);

/**
 * Thêm sản phẩm vào giỏ hàng.
 * Giá được snapshot tại thời điểm này bởi backend.
 * @param {{ productId: number, quantity: number }} data
 * @returns {{ items: CartItem[], totalPrice: number, itemCount: number }}
 */
export const addToCartApi = (productId, quantity) =>
    api.post('/shop/cart', { productId, quantity }).then((r) => r.data);

/**
 * Cập nhật số lượng của sản phẩm trong giỏ.
 * Truyền quantity = 0 để xóa sản phẩm đó.
 * @param {number} productId
 * @param {number} quantity
 */
export const updateCartItemApi = (productId, quantity) =>
    api.put(`/shop/cart/${productId}`, { quantity }).then((r) => r.data);

/**
 * Xóa một sản phẩm khỏi giỏ hàng
 * @param {number} productId
 */
export const removeCartItemApi = (productId) =>
    api.delete(`/shop/cart/${productId}`).then((r) => r.data);

/**
 * Xóa toàn bộ giỏ hàng
 */
export const clearCartApi = () =>
    api.delete('/shop/cart').then((r) => r.data);
