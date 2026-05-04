// src/pages/ChangePassword.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function ChangePassword() {
    const [form, setForm] = useState({ email: '', newPassword: '', confirmPassword: '' });
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { changePassword } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setLoading(true);
        await new Promise((r) => setTimeout(r, 500));
        const result = changePassword(form.email, form.newPassword, form.confirmPassword);
        setLoading(false);
        if (result.success) {
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } else {
            setErrors([result.message]);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e8eeff] via-[#f7f9fb] to-[#dbe1ff] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link to="/products" className="text-3xl font-black text-[#004ac6] tracking-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>
                        LiteCommerce
                    </Link>
                    <p className="text-[#434655] text-sm mt-2">Cập nhật mật khẩu của bạn</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#c3c6d7]/20">
                    <div className="flex items-center gap-3 mb-6">
                        <Link to="/login" className="p-2 hover:bg-[#f2f4f6] rounded-full transition-colors text-[#434655]">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                        <h1 className="text-2xl font-extrabold text-[#191c1e]">Đổi mật khẩu</h1>
                    </div>

                    {success && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">check_circle</span>
                            <span>Đổi mật khẩu thành công! Đang chuyển về trang đăng nhập...</span>
                        </div>
                    )}

                    {errors.length > 0 && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-[#ba1a1a] text-sm flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">error</span>
                            <div>{errors.map((e, i) => <p key={i}>{e}</p>)}</div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {[
                            { label: 'Email xác thực', name: 'email', type: 'email', placeholder: 'email@example.com', icon: 'mail' },
                            { label: 'Mật khẩu mới', name: 'newPassword', type: 'password', placeholder: '••••••••', icon: 'lock' },
                            { label: 'Xác nhận mật khẩu mới', name: 'confirmPassword', type: 'password', placeholder: '••••••••', icon: 'verified_user' },
                        ].map(({ label, name, type, placeholder, icon }) => (
                            <div key={name} className="space-y-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wider text-[#434655]">{label}</label>
                                <div className="flex items-center border border-[#c3c6d7] rounded-lg bg-[#f2f4f6] focus-within:border-[#004ac6] focus-within:ring-2 focus-within:ring-[#004ac6]/20 transition-all">
                                    <span className="material-symbols-outlined text-[#737686] ml-3">{icon}</span>
                                    <input
                                        type={type}
                                        required
                                        placeholder={placeholder}
                                        value={form[name]}
                                        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                                        className="flex-1 bg-transparent border-none outline-none focus:ring-0 px-3 py-3 text-sm placeholder:text-[#737686]"
                                    />
                                </div>
                            </div>
                        ))}

                        <button
                            type="submit"
                            disabled={loading || success}
                            className="w-full primary-gradient text-white py-3.5 rounded-xl font-bold text-base hover:opacity-90 active:scale-95 transition-all shadow-md shadow-[#004ac6]/20 mt-2 disabled:opacity-60"
                        >
                            {loading ? 'Đang xử lý...' : 'Xác nhận đổi mật khẩu'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
