// src/store/cartStore.js
// Quản lý giỏ hàng – đồng bộ với backend session cart.
// Mỗi thao tác gọi API và cập nhật state từ phản hồi server.
import { create } from 'zustand';
import {
    getCartApi,
    addToCartApi,
    updateCartItemApi,
    removeCartItemApi,
    clearCartApi,
} from '../lib/cartApi';

const ACCESS_TOKEN_COOKIE_NAME = 'access_token';

function getCookie(name) {
    try {
        const cookies = document.cookie ? document.cookie.split('; ') : [];
        const prefix = `${encodeURIComponent(name)}=`;
        for (const c of cookies) {
            if (c.startsWith(prefix)) {
                return decodeURIComponent(c.substring(prefix.length));
            }
        }
        return null;
    } catch {
        return null;
    }
}

function hasAccessTokenCookie() {
    const token = getCookie(ACCESS_TOKEN_COOKIE_NAME);
    return !!token;
}

/**
 * Store giỏ hàng – lưu trạng thái giỏ hàng đồng bộ với backend.
 * items: [{ productId, productName, price, quantity, total }]
 * Giá được snapshot bởi backend khi gọi addItem.
 */
export const useCartStore = create((set, get) => ({
    items: [],
    totalPrice: 0,
    itemCount: 0,
    loading: false,
    error: null,

    /**
     * Cập nhật state từ phản hồi API giỏ hàng
     */
    _applyCart(cart) {
        set({
            items: cart.items ?? [],
            totalPrice: cart.totalPrice ?? 0,
            itemCount: cart.itemCount ?? 0,
        });
    },

    /**
     * Tải giỏ hàng từ server (gọi khi đăng nhập hoặc mount trang Cart)
     */
    async loadCart() {
        if (!hasAccessTokenCookie()) return;
        set({ loading: true, error: null });
        try {
            const cart = await getCartApi();
            get()._applyCart(cart);
        } catch {
            set({ error: 'Không thể tải giỏ hàng' });
        } finally {
            set({ loading: false });
        }
    },

    /**
     * Thêm sản phẩm theo productId – giá được snapshot bởi backend
     * @param {number} productId
     * @param {number} quantity
     */
    async addItem(productId, quantity = 1) {
        const cart = await addToCartApi(productId, quantity);
        get()._applyCart(cart);
    },

    /**
     * Cập nhật số lượng sản phẩm trong giỏ
     * Số lượng < 1 sẽ xóa sản phẩm đó
     */
    async updateQuantity(productId, quantity) {
        if (quantity < 1) {
            return get().removeItem(productId);
        }
        const cart = await updateCartItemApi(productId, quantity);
        get()._applyCart(cart);
    },

    /**
     * Xóa một sản phẩm khỏi giỏ
     */
    async removeItem(productId) {
        const cart = await removeCartItemApi(productId);
        get()._applyCart(cart);
    },

    /**
     * Xóa toàn bộ giỏ hàng
     */
    async clearCart() {
        await clearCartApi();
        set({ items: [], totalPrice: 0, itemCount: 0 });
    },

    /**
     * Lấy tổng tiền giỏ hàng (dùng totalPrice từ server)
     */
    getSubtotal() {
        return get().totalPrice;
    },

    /**
     * Số lượng loại sản phẩm trong giỏ
     */
    getCount() {
        return get().itemCount;
    },

    /**
     * Xóa giỏ hàng local (dùng khi logout, không cần gọi API)
     */
    resetLocal() {
        set({ items: [], totalPrice: 0, itemCount: 0 });
    },
}));
