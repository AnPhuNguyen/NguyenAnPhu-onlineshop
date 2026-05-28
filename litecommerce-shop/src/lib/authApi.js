// src/lib/authApi.js
// API functions cho authentication (đăng nhập, đăng ký, đổi mật khẩu)
import api from './api';

/**
 * Đăng nhập khách hàng
 * Gửi email và mật khẩu thô (plain text) qua HTTPS, backend sẽ hash MD5 và so sánh
 * @param {string} email
 * @param {string} password
 * @returns {{ access_token: string, user: object }}
 */
export const loginApi = (email, password) =>
    api.post('/shop/auth/login', { email, password }).then((r) => r.data);

/**
 * Đăng ký tài khoản khách hàng mới
 * @param {{ customerName: string, email: string, password: string, confirmPassword: string }} data
 * @returns {{ message: string, customerId: number }}
 */
export const registerApi = (data) =>
    api.post('/shop/auth/register', data).then((r) => r.data);

/**
 * Đổi mật khẩu khách hàng (yêu cầu đã đăng nhập)
 * @param {{ oldPassword: string, newPassword: string, confirmPassword: string }} data
 */
export const changePasswordApi = (data) =>
    api.post('/shop/auth/change-password', data).then((r) => r.data);
