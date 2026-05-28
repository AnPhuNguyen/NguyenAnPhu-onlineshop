// src/lib/api.js
// Module trung tâm để giao tiếp với backend API
// JWT token được lưu trong cookie `access_token` (frontend đọc và đính kèm vào header Authorization)
import axios from 'axios';

// Vite proxy sẽ forward /api/* → http://localhost:3000/api/*
const api = axios.create({
    baseURL: '/api',
    withCredentials: true, // gửi cookie theo mỗi request
    headers: {
        'Content-Type': 'application/json',
    },
});

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

const safeHeadersInfo = (config) => {
    const auth = config?.headers?.Authorization || config?.headers?.authorization;
    if (!auth) return { hasAuthorization: false };
    return {
        hasAuthorization: true,
        authorizationStartsWithBearer: String(auth).startsWith('Bearer '),
        authorizationValuePreview: String(auth).slice(0, 20) + '…',
    };
};

// ─── Request Interceptor ────────────────────────────────────────────────────
// Đính kèm JWT token vào header Authorization trước mỗi request
api.interceptors.request.use((config) => {
    const token = getCookie(ACCESS_TOKEN_COOKIE_NAME);

    // eslint-disable-next-line no-console
    console.log('[api][request-debug:before]', {
        method: config?.method,
        url: config?.url ? `${config.baseURL || ''}${config.url}` : config?.baseURL,
        tokenInfo: { present: !!token, length: token?.length ?? 0 },
        headers: safeHeadersInfo(config),
        configHeadersKeys: Object.keys(config?.headers ?? {}),
    });

    if (token) {
        // ensure headers object exists
        if (!config.headers) config.headers = {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    // eslint-disable-next-line no-console
    console.log('[api][request-debug:after]', {
        method: config?.method,
        url: config?.url ? `${config.baseURL || ''}${config.url}` : config?.baseURL,
        tokenInfo: { present: !!token, length: token?.length ?? 0 },
        headers: safeHeadersInfo(config),
        configHeadersKeys: Object.keys(config?.headers ?? {}),
        Authorization: config?.headers?.Authorization || config?.headers?.authorization || null,
    });

    // keep original log for compatibility
    // eslint-disable-next-line no-console
    console.log('[api][request]', {
        method: config?.method,
        url: config?.url ? `${config.baseURL || ''}${config.url}` : config?.baseURL,
        tokenInfo: { present: !!token, length: token?.length ?? 0 },
        headers: safeHeadersInfo(config),
    });

    return config;
});

// ─── Response Interceptor ────────────────────────────────────────────────────
// Xử lý lỗi 401 (hết hạn token) → xóa token và log lỗi (NO redirect)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        const path = window.location?.pathname;

        // eslint-disable-next-line no-console
        console.error('[api][response:error]', {
            status,
            path,
            requestUrl: error?.config?.url,
            method: error?.config?.method,
            responseData: error?.response?.data,
        });

        if (status === 401) {
            // eslint-disable-next-line no-console
            console.warn('[api][401] Unauthorized (no redirect)', { currentPath: path });

            // clear cookie to stop repeated failures
            document.cookie = `${encodeURIComponent(ACCESS_TOKEN_COOKIE_NAME)}=; Path=/; Max-Age=0; SameSite=Lax; Secure`;
        }

        return Promise.reject(error);
    },
);

export default api;
