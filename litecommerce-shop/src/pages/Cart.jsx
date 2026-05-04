// src/pages/Cart.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

function formatPrice(price) {
    return price.toLocaleString('vi-VN') + '₫';
}

export default function Cart() {
    const { items, updateQuantity, removeItem, clearCart, getSubtotal } = useCartStore();
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const subtotal = getSubtotal();

    if (!isAuthenticated) {
        return (
            <div className="max-w-6xl mx-auto px-6 py-20 text-center">
                <span className="material-symbols-outlined text-7xl text-[#737686]">shopping_cart</span>
                <p className="text-xl font-medium text-[#737686] mt-4 mb-6">
                    Vui lòng đăng nhập để xem giỏ hàng
                </p>
                <Link
                    to="/login"
                    state={{ from: '/cart' }}
                    className="primary-gradient text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all"
                >
                    Đăng nhập
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                <h1 className="text-3xl font-extrabold" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    Giỏ hàng của bạn
                </h1>
                {items.length > 0 && (
                    <button
                        onClick={clearCart}
                        className="w-fit text-[#ba1a1a] hover:bg-[#ffdad6]/50 px-4 py-2 rounded-xl border border-[#ba1a1a]/20 flex items-center gap-2 font-bold transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined text-xl">delete_sweep</span>
                        Xóa toàn bộ giỏ hàng
                    </button>
                )}
            </div>

            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-64 text-[#737686] gap-4">
                    <span className="material-symbols-outlined text-7xl">shopping_cart</span>
                    <p className="text-xl font-medium">Giỏ hàng của bạn đang trống</p>
                    <Link
                        to="/products"
                        className="primary-gradient text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all"
                    >
                        Tiếp tục mua hàng
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Cart items */}
                    <div className="flex-grow space-y-4">
                        {items.map((item) => (
                            <div
                                key={item.productId}
                                className="bg-white rounded-xl p-5 flex items-center gap-5 ambient-shadow"
                            >
                                {/* Photo */}
                                <div className="w-20 h-20 flex-shrink-0 bg-[#eceef0] rounded-lg flex items-center justify-center overflow-hidden">
                                    {item.photo ? (
                                        <img src={item.photo} alt={item.productName} className="object-cover w-full h-full" />
                                    ) : (
                                        <span className="material-symbols-outlined text-3xl text-[#737686]">inventory_2</span>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-grow min-w-0">
                                    <h3 className="font-bold text-[#191c1e] truncate">{item.productName}</h3>
                                    <p className="text-sm text-[#737686]">{item.unit}</p>
                                    <p className="text-[#004ac6] font-bold mt-1">{formatPrice(item.price)}</p>
                                </div>

                                {/* Quantity */}
                                <div className="flex items-center border border-[#c3c6d7] rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                        className="px-3 py-2 hover:bg-[#f2f4f6] transition-colors font-bold"
                                    >
                                        −
                                    </button>
                                    <span className="px-3 font-bold min-w-[2rem] text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                        className="px-3 py-2 hover:bg-[#f2f4f6] transition-colors font-bold"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Line total */}
                                <div className="text-right min-w-[120px]">
                                    <p className="font-black text-[#191c1e]">{formatPrice(item.price * item.quantity)}</p>
                                </div>

                                {/* Remove */}
                                <button
                                    onClick={() => removeItem(item.productId)}
                                    className="text-[#ba1a1a] hover:bg-[#ffdad6] p-2 rounded-full transition-all"
                                >
                                    <span className="material-symbols-outlined">delete</span>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:w-80 flex-shrink-0">
                        <div className="bg-white rounded-xl p-8 ambient-shadow sticky top-28">
                            <h2 className="text-xl font-bold mb-6">Tóm tắt</h2>
                            <div className="space-y-3 border-b border-[#c3c6d7] pb-5 mb-5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#737686]">Tạm tính</span>
                                    <span className="font-bold">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#737686]">Phí vận chuyển</span>
                                    <span className="font-bold text-green-600">Miễn phí</span>
                                </div>
                            </div>
                            <div className="flex justify-between font-black text-lg mb-8">
                                <span>Tổng cộng</span>
                                <span className="text-[#004ac6]">{formatPrice(subtotal)}</span>
                            </div>
                            <Link
                                to="/checkout"
                                className="block w-full primary-gradient text-white py-4 rounded-xl font-bold text-center text-lg ambient-shadow hover:opacity-90 transition-all"
                            >
                                Thanh toán
                            </Link>
                            <Link
                                to="/products"
                                className="block text-center text-[#004ac6] font-bold mt-4 hover:underline"
                            >
                                Tiếp tục mua hàng
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
