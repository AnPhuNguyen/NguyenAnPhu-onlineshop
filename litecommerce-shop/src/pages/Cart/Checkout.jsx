// src/pages/Cart/Checkout.jsx
// Trang thanh toán – lấy mặc định từ profile và tạo đơn hàng thực
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { useOrderStore } from '../../store/orderStore';
import { PROVINCES } from '../../data/provinces';

function formatPrice(price) {
    return Number(price).toLocaleString('vi-VN') + '₫';
}

export default function Checkout() {
    const { items, getSubtotal, resetLocal } = useCartStore();
    const { user, isAuthenticated } = useAuthStore();
    const { createOrder, loading: orderLoading } = useOrderStore();
    const navigate = useNavigate();

    const [deliveryProvince, setDeliveryProvince] = useState(user?.province || '');
    const [deliveryAddress, setDeliveryAddress] = useState(user?.address || '');
    const [errorMsg, setErrorMsg] = useState('');

    const subtotal = getSubtotal();

    if (!isAuthenticated) {
        navigate('/login', { state: { from: '/checkout' } });
        return null;
    }

    if (items.length === 0) {
        return (
            <div className="max-w-6xl mx-auto px-6 py-20 text-center text-[#737686]">
                <p>Giỏ hàng trống. <Link to="/products" className="text-[#004ac6] font-bold hover:underline">Quay lại mua hàng</Link></p>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        if (!deliveryProvince || !deliveryAddress.trim()) return;

        const result = await createOrder({ deliveryProvince, deliveryAddress });

        if (result.success) {
            resetLocal(); // Xóa giỏ hàng local sau khi đặt hàng thành công
            navigate(`/orders/detail/${result.orderId}`, { state: { success: 'Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại LiteCommerce.' } });
        } else {
            setErrorMsg(result.message);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-extrabold mb-10" style={{ fontFamily: "'Manrope', sans-serif" }}>Thanh toán</h1>

            {errorMsg && (
                <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3">
                    <span className="material-symbols-outlined font-bold">error</span>
                    <p className="font-bold">{errorMsg}</p>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Thông tin giao nhận */}
                    <div className="flex-grow space-y-6">
                        <div className="bg-white rounded-xl p-8 ambient-shadow">
                            <h2 className="text-xl font-bold mb-6">Thông tin giao hàng</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-bold text-[#737686] block mb-2">Tỉnh/Thành phố <span className="text-[#ba1a1a]">*</span></label>
                                    <select
                                        required
                                        value={deliveryProvince}
                                        onChange={(e) => setDeliveryProvince(e.target.value)}
                                        className="w-full bg-[#eceef0] rounded-xl px-4 py-3 border border-[#c3c6d7] focus:border-[#004ac6] focus:ring-0 outline-none text-sm font-medium transition-all"
                                    >
                                        <option value="">-- Chọn tỉnh/thành --</option>
                                        {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-[#737686] block mb-2">Địa chỉ chi tiết <span className="text-[#ba1a1a]">*</span></label>
                                    <input
                                        type="text"
                                        required
                                        value={deliveryAddress}
                                        onChange={(e) => setDeliveryAddress(e.target.value)}
                                        placeholder="Số nhà, tên đường..."
                                        className="w-full bg-[#eceef0] rounded-xl px-4 py-3 border border-[#c3c6d7] focus:border-[#004ac6] focus:ring-0 outline-none text-sm font-medium transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Sản phẩm */}
                        <div className="bg-white rounded-xl p-8 ambient-shadow">
                            <h2 className="text-xl font-bold mb-6">Đơn hàng của bạn</h2>
                            <div className="divide-y divide-[#c3c6d7]">
                                {items.map((item) => (
                                    <div key={item.productId} className="flex items-center gap-4 py-4">
                                        <div className="w-12 h-12 bg-[#eceef0] rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                                            {item.photo ? (
                                                <img src={item.photo} alt={item.productName} className="w-full h-full object-cover rounded-lg" />
                                            ) : (
                                                <span className="material-symbols-outlined text-[#737686]">inventory_2</span>
                                            )}
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <p className="font-bold text-[#191c1e] truncate text-sm">{item.productName}</p>
                                            <p className="text-xs text-[#737686]">{item.quantity} x {formatPrice(item.price)}</p>
                                        </div>
                                        <p className="font-bold text-[#191c1e] text-sm">{formatPrice(item.price * item.quantity)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tổng kết */}
                    <div className="lg:w-80 flex-shrink-0">
                        <div className="bg-white rounded-xl p-8 ambient-shadow sticky top-28">
                            <h2 className="text-xl font-bold mb-6">Tổng đơn hàng</h2>
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
                            <button
                                type="submit"
                                disabled={orderLoading}
                                className="w-full primary-gradient text-white py-4 rounded-xl font-bold text-lg ambient-shadow hover:opacity-90 transition-all active:scale-95 disabled:opacity-60 shadow-lg shadow-blue-500/20"
                            >
                                {orderLoading ? 'Đang xử lý...' : 'Đặt hàng ngay'}
                            </button>
                            <Link to="/cart" className="block text-center text-[#004ac6] font-bold mt-4 hover:underline">Quay lại giỏ hàng</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
