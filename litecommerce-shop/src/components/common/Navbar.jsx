// src/components/common/Navbar.jsx
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';

export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuthStore();
    const cartCount = useCartStore((s) => s.items.length);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
        navigate('/products');
    };

    return (
        <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
            <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
                {/* Logo */}
                <Link
                    to="/products"
                    className="text-2xl font-black tracking-tight text-blue-700"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                    LiteCommerce
                </Link>

                {/* Right side icons */}
                <div className="flex items-center gap-3">
                    {/* Cart */}
                    <div className="relative">
                        <Link
                            to="/cart"
                            className="p-2 text-[#434655] hover:bg-[#eceef0] rounded-full transition-all active:opacity-80 active:scale-95 flex items-center"
                            title="Giỏ hàng"
                        >
                            <span className="material-symbols-outlined">shopping_cart</span>
                        </Link>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-[#ba1a1a] text-[#ffdad6] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                                {cartCount}
                            </span>
                        )}
                    </div>

                    {/* Orders */}
                    {isAuthenticated && (
                        <Link
                            to="/orders"
                            className="p-2 text-[#434655] hover:bg-[#eceef0] rounded-full transition-all active:opacity-80 active:scale-95 flex items-center"
                            title="Đơn hàng"
                        >
                            <span className="material-symbols-outlined">receipt_long</span>
                        </Link>
                    )}

                    {/* Avatar dropdown or Login button */}
                    {isAuthenticated ? (
                        <div className="relative ml-1" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen((prev) => !prev)}
                                className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#dbe1ff] bg-[#eceef0] flex-shrink-0 focus:outline-none"
                            >
                                <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-700">
                                    <span className="material-symbols-outlined text-2xl">person</span>
                                </div>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#c3c6d7]/20 py-2 z-50">
                                    <div className="px-4 py-2 border-b border-[#e0e3e5]">
                                        <p className="text-sm font-bold text-[#191c1e] truncate">{user?.customerName}</p>
                                        <p className="text-xs text-[#737686] truncate">{user?.email}</p>
                                    </div>
                                    <Link
                                        to="/profile"
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#191c1e] hover:bg-[#f2f4f6] transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-base">person</span>
                                        Hồ sơ cá nhân
                                    </Link>
                                    <Link
                                        to="/orders"
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#191c1e] hover:bg-[#f2f4f6] transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-base">receipt_long</span>
                                        Đơn hàng của tôi
                                    </Link>
                                    <div className="border-t border-[#e0e3e5] mt-1 pt-1">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-base">logout</span>
                                            Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="primary-gradient text-white px-5 py-2 rounded-xl font-bold text-sm hover:opacity-90 transition-all active:scale-95 ml-1"
                        >
                            Đăng nhập
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
