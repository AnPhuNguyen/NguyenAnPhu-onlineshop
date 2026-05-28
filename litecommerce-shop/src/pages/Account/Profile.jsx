// src/pages/Profile.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { PROVINCES } from '../../data/mockData';

export default function Profile() {
    const { user, isAuthenticated, updateProfile } = useAuthStore();
    const navigate = useNavigate();

    // Always keep hooks declared before any conditional returns
    const [form, setForm] = useState({
        customerName: '',
        phone: '',
        province: '',
        address: '',
    });
    const [success, setSuccess] = useState('');

    useEffect(() => {
        console.log('[Profile] auth state', { isAuthenticated, user });

        if (user && typeof user === 'object') {
            setForm({
                customerName: user.customerName ?? '',
                phone: user.phone ?? '',
                province: user.province ?? '',
                address: user.address ?? '',
            });
        }
    }, [isAuthenticated, user]);

    useEffect(() => {
        if (!isAuthenticated) {
            console.warn('[Profile] not authenticated -> redirecting to /login', { from: '/profile' });
            navigate('/login', { state: { from: '/profile' } });
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile(form);
        setSuccess('Cập nhật thông tin thành công!');
        setTimeout(() => setSuccess(''), 3000);
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-extrabold mb-10" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Hồ sơ cá nhân
            </h1>

            {success && (
                <div className="bg-green-50 border border-green-300 text-green-700 rounded-xl px-6 py-4 mb-6">
                    {success}
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-10">
                {/* Sidebar */}
                <div className="md:w-64 shrink-0">
                    <div className="bg-white rounded-xl p-6 ambient-shadow text-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-[#b4c5ff] flex items-center justify-center mx-auto mb-4">
                            <span className="material-symbols-outlined text-4xl text-primary">person</span>
                        </div>
                        <p className="font-bold text-[#191c1e]">{user?.customerName}</p>
                        <p className="text-sm text-outline">{user?.email}</p>
                    </div>
                    <nav className="space-y-2">
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#b4c5ff] text-primary font-bold">
                            <span className="material-symbols-outlined">person</span>
                            Thông tin cá nhân
                        </div>
                        <Link
                            to="/orders"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#191c1e] hover:bg-surface-container-low font-medium transition-colors"
                        >
                            <span className="material-symbols-outlined">receipt_long</span>
                            Đơn hàng của tôi
                        </Link>
                        <Link
                            to="/change-password"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#191c1e] hover:bg-surface-container-low font-medium transition-colors"
                        >
                            <span className="material-symbols-outlined">lock_reset</span>
                            Đổi mật khẩu
                        </Link>
                    </nav>
                </div>

                {/* Form */}
                <div className="grow">
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 ambient-shadow">
                        <h2 className="text-xl font-bold mb-6">Cập nhật thông tin</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full name */}
                            <div className="md:col-span-2">
                                <label className="text-sm font-bold text-outline block mb-2">
                                    Họ tên <span className="text-error">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={form.customerName}
                                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                                    className="w-full bg-surface-container rounded-xl px-4 py-3 border border-outline-variant focus:border-primary focus:ring-0 outline-none text-sm font-medium transition-all"
                                />
                            </div>
                            {/* Email (readonly) */}
                            <div className="md:col-span-2">
                                <label className="text-sm font-bold text-outline block mb-2">Email</label>
                                <input
                                    type="email"
                                    readOnly
                                    value={user?.email}
                                    className="w-full bg-surface-container rounded-xl px-4 py-3 border border-outline-variant text-sm font-medium text-outline cursor-not-allowed"
                                />
                            </div>
                            {/* Phone */}
                            <div>
                                <label className="text-sm font-bold text-outline block mb-2">Điện thoại</label>
                                <input
                                    type="tel"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    placeholder="Số điện thoại"
                                    className="w-full bg-surface-container rounded-xl px-4 py-3 border border-outline-variant focus:border-primary focus:ring-0 outline-none text-sm font-medium transition-all"
                                />
                            </div>
                            {/* Province */}
                            <div>
                                <label className="text-sm font-bold text-outline block mb-2">Tỉnh/Thành phố</label>
                                <select
                                    value={form.province}
                                    onChange={(e) => setForm({ ...form, province: e.target.value })}
                                    className="w-full bg-surface-container rounded-xl px-4 py-3 border border-outline-variant focus:border-primary focus:ring-0 outline-none text-sm font-medium transition-all"
                                >
                                    <option value="">-- Chọn tỉnh/thành --</option>
                                    {PROVINCES.map((p) => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Address */}
                            <div className="md:col-span-2">
                                <label className="text-sm font-bold text-outline block mb-2">Địa chỉ</label>
                                <input
                                    type="text"
                                    value={form.address}
                                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    placeholder="Số nhà, đường, phường/xã..."
                                    className="w-full bg-surface-container rounded-xl px-4 py-3 border border-outline-variant focus:border-primary focus:ring-0 outline-none text-sm font-medium transition-all"
                                />
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button
                                type="submit"
                                className="primary-gradient text-white px-10 py-3 rounded-xl font-bold ambient-shadow hover:opacity-90 transition-all active:scale-95"
                            >
                                Lưu thay đổi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
