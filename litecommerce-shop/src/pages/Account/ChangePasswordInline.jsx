// src/pages/Account/ChangePasswordInline.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function ChangePasswordInline() {
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

        // Giả lập thời gian xử lý để UX mượt hơn
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
        <div className="grow">
            <div className="bg-white rounded-xl p-8 ambient-shadow">
                <h2 className="text-xl font-bold mb-6">Đổi mật khẩu</h2>

                {success && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">check_circle</span>
                        <span>Đổi mật khẩu thành công! Đang chuyển về trang đăng nhập...</span>
                    </div>
                )}

                {errors.length > 0 && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-error text-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">error</span>
                        <div>
                            {errors.map((e, i) => (
                                <p key={i}>{e}</p>
                            ))}
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {[
                        { label: 'Email xác thực', name: 'email', type: 'email', placeholder: 'email@example.com', icon: 'mail' },
                        { label: 'Mật khẩu mới', name: 'newPassword', type: 'password', placeholder: '••••••••', icon: 'lock' },
                        { label: 'Xác nhận mật khẩu mới', name: 'confirmPassword', type: 'password', placeholder: '••••••••', icon: 'verified_user' },
                    ].map(({ label, name, type, placeholder, icon }) => (
                        <div key={name} className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                                {label}
                            </label>

                            <div className="flex items-center border border-outline-variant rounded-lg bg-surface-container-low focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                                <span className="material-symbols-outlined text-outline ml-3">{icon}</span>
                                <input
                                    type={type}
                                    required
                                    placeholder={placeholder}
                                    value={form[name]}
                                    onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                                    className="flex-1 bg-transparent border-none outline-none focus:ring-0 px-3 py-3 text-sm placeholder:text-outline"
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={loading || success}
                        className="w-full primary-gradient text-white py-3.5 rounded-xl font-bold text-base hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/20 mt-2 disabled:opacity-60"
                    >
                        {loading ? 'Đang xử lý...' : 'Xác nhận đổi mật khẩu'}
                    </button>
                </form>
            </div>
        </div>
    );
}
