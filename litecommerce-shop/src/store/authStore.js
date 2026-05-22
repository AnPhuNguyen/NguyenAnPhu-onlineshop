// src/store/authStore.js
// Quản lý trạng thái xác thực (authentication) của khách hàng
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginApi, registerApi, changePasswordApi } from '../lib/authApi';

/**
 * Store xác thực – lưu thông tin user và trạng thái đăng nhập.
 * JWT token được lưu riêng trong localStorage và đính kèm bởi Axios interceptor.
 */
export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            /**
             * Đăng nhập bằng email và mật khẩu thô (plain text qua HTTPS)
             * Backend sẽ xác thực và trả về JWT token
             */
            login: async (email, password) => {
                try {
                    const data = await loginApi(email, password);
                    localStorage.setItem('litecommerce_token', data.access_token);
                    set({ user: data.user, isAuthenticated: true });
                    return { success: true };
                } catch (err) {
                    const message =
                        err.response?.data?.message || 'Email hoặc mật khẩu không đúng';
                    return { success: false, message };
                }
            },

            /**
             * Đăng ký tài khoản mới, tự động đăng nhập sau khi tạo thành công
             */
            register: async (data) => {
                try {
                    await registerApi(data);
                    // Tự động đăng nhập sau khi đăng ký thành công
                    const loginData = await loginApi(data.email, data.password);
                    localStorage.setItem('litecommerce_token', loginData.access_token);
                    set({ user: loginData.user, isAuthenticated: true });
                    return { success: true };
                } catch (err) {
                    const message =
                        err.response?.data?.message || 'Đăng ký thất bại';
                    return { success: false, message };
                }
            },

            /**
             * Đăng xuất – xóa token và reset state
             */
            logout: () => {
                localStorage.removeItem('litecommerce_token');
                set({ user: null, isAuthenticated: false });
            },

            /**
             * Cập nhật thông tin hồ sơ trong state (sau khi API update thành công)
             */
            updateProfile: (data) => {
                set((state) => ({
                    user: { ...state.user, ...data },
                }));
                return { success: true };
            },

            /**
             * Đổi mật khẩu thông qua API
             */
            changePassword: async (oldPassword, newPassword, confirmPassword) => {
                if (newPassword !== confirmPassword) {
                    return { success: false, message: 'Mật khẩu xác nhận không khớp' };
                }
                if (newPassword.length < 6) {
                    return { success: false, message: 'Mật khẩu phải có ít nhất 6 ký tự' };
                }
                try {
                    await changePasswordApi({ oldPassword, newPassword, confirmPassword });
                    return { success: true };
                } catch (err) {
                    const message =
                        err.response?.data?.message || 'Đổi mật khẩu thất bại';
                    return { success: false, message };
                }
            },
        }),
        {
            name: 'litecommerce-auth',
            // Chỉ persist user info, không persist token (token đã trong localStorage riêng)
            partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
        },
    ),
);

