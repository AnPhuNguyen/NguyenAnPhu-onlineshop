// src/store/authStore.js
// Quản lý trạng thái xác thực (authentication) của khách hàng
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginApi, registerApi, changePasswordApi } from '../lib/authApi';

const ACCESS_TOKEN_COOKIE_NAME = 'access_token'; // cookie name used by backend auth response

function setCookie(name, value, options = {}) {
    const { path = '/', maxAgeSeconds, secure = true } = options;

    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value ?? '')}`;
    if (path) cookie += `; Path=${path}`;
    if (typeof maxAgeSeconds === 'number') cookie += `; Max-Age=${maxAgeSeconds}`;

    if (secure) cookie += `; Secure`;
    cookie += '; SameSite=Lax';

    document.cookie = cookie;
}

function removeCookie(name) {
    document.cookie = `${encodeURIComponent(name)}=; Path=/; Max-Age=0; SameSite=Lax; Secure`;
}

/**
 * Store xác thực – lưu thông tin user và trạng thái đăng nhập.
 * JWT token được lưu trong cookie `accedd_token` để tự động auth.
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

                    // Temporary debug logs to inspect backend response shape
                    // eslint-disable-next-line no-console
                    console.log('[authStore][login] backend response:', data);

                    const accessToken = data?.data?.access_token;
                    const user = data?.data?.user;

                    if (!accessToken) {
                        // eslint-disable-next-line no-console
                        console.error('[authStore][login] missing access_token (expected data.data.access_token)');
                    }

                    setCookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
                        maxAgeSeconds: 60 * 60 * 24 * 7,
                    });

                    // eslint-disable-next-line no-console
                    console.log(
                        '[authStore][login] set cookie:',
                        ACCESS_TOKEN_COOKIE_NAME,
                        'len=',
                        accessToken?.length,
                    );

                    set({ user, isAuthenticated: true });
                    return { success: true };
                } catch (err) {
                    // eslint-disable-next-line no-console
                    console.error('[authStore][login] error:', err?.response?.data ?? err?.message ?? err);
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

                    const loginData = await loginApi(data.email, data.password);

                    // eslint-disable-next-line no-console
                    console.log('[authStore][register] backend login response:', loginData);

                    const accessToken = loginData?.data?.access_token;
                    const user = loginData?.data?.user;

                    if (!accessToken) {
                        // eslint-disable-next-line no-console
                        console.error('[authStore][register] missing access_token (expected data.data.access_token)');
                    }

                    setCookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
                        maxAgeSeconds: 60 * 60 * 24 * 7,
                    });

                    // eslint-disable-next-line no-console
                    console.log(
                        '[authStore][register] set cookie:',
                        ACCESS_TOKEN_COOKIE_NAME,
                        'len=',
                        accessToken?.length,
                    );

                    set({ user, isAuthenticated: true });
                    return { success: true };
                } catch (err) {
                    // eslint-disable-next-line no-console
                    console.error('[authStore][register] error:', err?.response?.data ?? err?.message ?? err);
                    const message =
                        err.response?.data?.message || 'Đăng ký thất bại';
                    return { success: false, message };
                }
            },

            /**
             * Đăng xuất – xóa token và reset state
             */
            logout: () => {
                removeCookie(ACCESS_TOKEN_COOKIE_NAME);
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
            // Chỉ persist user info, không persist token (token nằm trong cookie)
            partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
        },
    ),
);
