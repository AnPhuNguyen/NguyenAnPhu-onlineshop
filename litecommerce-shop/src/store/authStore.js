// src/store/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MOCK_USER } from '../data/mockData';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            login: (email, password) => {
                // Demo: chấp nhận email/mật khẩu bất kỳ
                if (email && password) {
                    const user = { ...MOCK_USER, email };
                    set({ user, isAuthenticated: true });
                    return { success: true };
                }
                return { success: false, message: 'Email hoặc mật khẩu không đúng' };
            },

            register: (data) => {
                const user = {
                    id: Date.now(),
                    customerName: data.customerName,
                    contactName: data.customerName,
                    email: data.email,
                    phone: '',
                    province: '',
                    address: '',
                    isLocked: false,
                };
                set({ user, isAuthenticated: true });
                return { success: true };
            },

            logout: () => {
                set({ user: null, isAuthenticated: false });
            },

            updateProfile: (data) => {
                set((state) => ({
                    user: { ...state.user, ...data },
                }));
                return { success: true };
            },

            changePassword: (email, newPassword, confirmPassword) => {
                if (newPassword !== confirmPassword) {
                    return { success: false, message: 'Mật khẩu xác nhận không khớp' };
                }
                if (newPassword.length < 6) {
                    return { success: false, message: 'Mật khẩu phải có ít nhất 6 ký tự' };
                }
                return { success: true };
            },
        }),
        {
            name: 'litecommerce-auth',
        }
    )
);
