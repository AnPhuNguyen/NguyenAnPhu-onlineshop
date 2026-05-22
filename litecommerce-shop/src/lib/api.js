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

// ─── Request Interceptor ────────────────────────────────────────────────────
// Đính kèm JWT token vào header Authorization trước mỗi request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('litecommerce_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ─── Response Interceptor ───────────────────────────────────────────────────
// Xử lý lỗi 401 (hết hạn token) → xóa token và reload trang
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('litecommerce_token');
            // Chỉ redirect nếu không đang ở trang auth
            const isAuthPage = ['/login', '/register', '/change-password'].includes(
                window.location.pathname,
            );
            if (!isAuthPage) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    },
);

export default api;
