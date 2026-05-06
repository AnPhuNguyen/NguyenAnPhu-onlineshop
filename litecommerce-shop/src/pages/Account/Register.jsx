// src/pages/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function Register() {
    const [form, setForm] = useState({
        customerName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const { register } = useAuthStore();
    const navigate = useNavigate();

    const validate = () => {
        const errs = [];
        if (!form.customerName.trim()) errs.push('Họ và tên không được để trống');
        if (!form.email.trim()) errs.push('Email không được để trống');
        if (form.password.length < 6) errs.push('Mật khẩu phải có ít nhất 6 ký tự');
        if (form.password !== form.confirmPassword) errs.push('Mật khẩu xác nhận không khớp');
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (errs.length > 0) { setErrors(errs); return; }
        setErrors([]);
        setLoading(true);
        await new Promise((r) => setTimeout(r, 500));
        register(form);
        setLoading(false);
        navigate('/products');
    };

    const field = (label, name, type = 'text', placeholder = '', icon) => (
        <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#434655]">{label}</label>
            <div className="flex items-center border border-[#c3c6d7] rounded-xl bg-[#f2f4f6] focus-within:border-[#004ac6] focus-within:ring-2 focus-within:ring-[#004ac6]/20 transition-all pr-3">
                <span className="material-symbols-outlined ml-3 text-[#737686] text-[20px]">{icon}</span>
                <input
                    type={type}
                    required
                    placeholder={placeholder}
                    value={form[name]}
                    onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                    className="flex-1 bg-transparent border-none outline-none focus:ring-0 px-3 py-3.5 text-sm font-medium placeholder:text-[#737686]"
                />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e8eeff] via-[#f7f9fb] to-[#dbe1ff] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link to="/products" className="text-3xl font-black text-[#004ac6] tracking-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>
                        LiteCommerce
                    </Link>
                    <p className="text-[#434655] text-sm mt-2">Tạo tài khoản mới</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#c3c6d7]/20">
                    <h1 className="text-2xl font-extrabold text-[#191c1e] mb-6">Đăng ký</h1>

                    {errors.length > 0 && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-[#ba1a1a] text-sm flex items-start gap-2">
                            <span className="material-symbols-outlined text-base mt-0.5">error</span>
                            <div>
                                {errors.map((err, i) => <p key={i}>{err}</p>)}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {field('Họ và tên', 'customerName', 'text', 'Nguyễn Văn A', 'person')}
                        {field('Email', 'email', 'email', 'email@example.com', 'mail')}
                        {field('Mật khẩu', 'password', 'password', '••••••••', 'lock')}
                        {field('Xác nhận mật khẩu', 'confirmPassword', 'password', '••••••••', 'lock_reset')}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full primary-gradient text-white py-3.5 rounded-xl font-bold text-base hover:opacity-90 active:scale-95 transition-all shadow-md shadow-[#004ac6]/20 mt-2 disabled:opacity-60"
                        >
                            {loading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-[#434655] mt-6">
                        Đã có tài khoản?{' '}
                        <Link to="/login" className="text-[#004ac6] font-bold hover:underline">Đăng nhập</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
