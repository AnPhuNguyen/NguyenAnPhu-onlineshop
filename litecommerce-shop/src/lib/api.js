// src/lib/api.js
// Module trung tâm để giao tiếp với backend API
// JWT token được lưu trong cookie httpOnly (set bởi server) hoặc localStorage khi không có httpOnly
import axios from 'axios';

// Vite proxy sẽ forward /api/* → http://localhost:3000/api/*
const api = axios.create({
    baseURL: '/api',
    withCredentials: true, // gửi cookie theo mỗi request (cho JWT cookie)
    headers: {
        'Content-Type': 'application/json',
    },
});

const safeTokenInfo = () => {
    try {
        const token = localStorage.getItem('litecommerce_token');
        if (!token) return { present: false, length: 0 };
        return { present: true, length: token.length };
    } catch {
        return { present: false, length: 0 };
    }
};

const safeHeadersInfo = (config) => {
    const auth = config?.headers?.Authorization || config?.headers?.authorization;
    if (!auth) return { hasAuthorization: false };
    return { hasAuthorization: true, authorizationStartsWithBearer: String(auth).startsWith('Bearer ') };
};

// ─── Request Interceptor ────────────────────────────────────────────────────
// Đính kèm JWT token vào header Authorization trước mỗi request
api.interceptors.request.use((config) => {
    const tokenInfo = safeTokenInfo();
    const finalUrl = config?.url ? `${config.baseURL || ''}${config.url}` : config?.baseURL;
    console.log('[api][request]', {
        method: config?.method,
        url: finalUrl,
        tokenInfo,
        headers: safeHeadersInfo(config),
    });

    const token = localStorage.getItem('litecommerce_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ─── Response Interceptor ───────────────────────────────────────────────────
// Xử lý lỗi 401 (hết hạn token) → xóa token và redirect trang
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        const path = window.location?.pathname;
        const tokenInfo = safeTokenInfo();

        console.error('[api][response:error]', {
            status,
            path,
            tokenInfo,
            requestUrl: error?.config?.url,
            method: error?.config?.method,
            responseData: error?.response?.data,
        });

        if (status === 401) {
            console.warn('[api][401] Unauthorized -> removing token and redirecting (if not auth page)', {
                currentPath: path,
                isAuthPage: ['/login', '/register', '/change-password'].includes(path),
            });

            localStorage.removeItem('litecommerce_token');

            // Chỉ redirect nếu không đang ở trang auth
            const isAuthPage = ['/login', '/register', '/change-password'].includes(path);
            if (!isAuthPage) {
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    },
);

export default api;
