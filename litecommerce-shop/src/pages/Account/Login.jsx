// src/pages/Account/Login.jsx
// Trang đăng nhập – kết nối backend API
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/products';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const result = await login(form.email, form.password);
        setLoading(false);
        if (result.success) {
            navigate(from, { replace: true });
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-[#e8eeff] via-[#f7f9fb] to-[#dbe1ff] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link
                        to="/products"
                        className="text-3xl font-black text-primary tracking-tight"
                        style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                        LiteCommerce
                    </Link>
                    <p className="text-on-surface-variant text-sm mt-2">Chào mừng bạn trở lại</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 border border-outline-variant/20">
                    <h1 className="text-2xl font-extrabold text-[#191c1e] mb-6">Đăng nhập</h1>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-error text-sm flex items-center gap-2">
                            <span className="material-symbols-outlined text-base font-bold">error</span>
                            <p className="font-medium">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                                Email
                            </label>
                            <div className="flex items-center border border-outline-variant rounded-lg bg-surface-container-low focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                                <span className="material-symbols-outlined text-outline ml-3 text-lg">mail</span>
                                <input
                                    type="email"
                                    required
                                    placeholder="email@example.com"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="flex-1 bg-transparent border-none outline-none focus:ring-0 px-3 py-3 text-sm font-medium placeholder:text-outline"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                                Mật khẩu
                            </label>
                            <div className="flex items-center border border-outline-variant rounded-lg bg-surface-container-low focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                                <span className="material-symbols-outlined text-outline ml-3 text-lg">lock</span>
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="flex-1 bg-transparent border-none outline-none focus:ring-0 px-3 py-3 text-sm font-medium placeholder:text-outline"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full primary-gradient text-white py-3.5 rounded-xl font-bold text-base hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/20 mt-2 disabled:opacity-60"
                        >
                            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </button>
                    </form>

                    <div className="mt-6 flex flex-col items-center gap-3">
                        <Link to="/change-password" title="Chưa hỗ trợ" className="text-xs text-primary font-medium hover:underline opacity-50 cursor-not-allowed">
                            Quên mật khẩu?
                        </Link>
                        <p className="text-center text-sm text-on-surface-variant">
                            Chưa có tài khoản?{' '}
                            <Link to="/register" className="text-primary font-bold hover:underline">
                                Đăng ký ngay
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
