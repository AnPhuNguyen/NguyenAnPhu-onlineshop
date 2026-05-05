// src/auth.js
// Mock user đăng nhập để thử nghiệm phân quyền.
export const MOCK_ACCOUNTS = [
    {
        email: 'employee@litecommerce.com',
        password: '123456',
        displayName: 'Nhân viên',
        roleNames: 'employee',
    },
    {
        email: 'admin@litecommerce.com',
        password: '123456',
        displayName: 'Quản trị viên',
        roleNames: 'employee,admin',
    },
    {
        email: 'guest@litecommerce.com',
        password: '123456',
        displayName: 'Khách không quyền',
        roleNames: 'guest',
    },
];

const AUTH_STORAGE_KEY = 'litecommerce_admin_auth';

export function loginWithMockAccount(email, password) {
    const account = MOCK_ACCOUNTS.find(
        (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password,
    );

    if (!account) {
        return { success: false, message: 'Email hoặc mật khẩu không đúng.' };
    }

    // Chỉ cho phép role hợp lệ theo guide.
    if (account.roleNames !== 'employee' && account.roleNames !== 'employee,admin') {
        return {
            success: false,
            message: 'Tài khoản không có quyền truy cập hệ thống nhân viên.',
            unauthorizedRole: true,
        };
    }

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(account));
    return { success: true, account };
}

export function getCurrentAuth() {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;

    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

export function logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function isAuthenticated() {
    return Boolean(getCurrentAuth());
}

export function isAdmin() {
    const auth = getCurrentAuth();
    return auth?.roleNames === 'employee,admin';
}
