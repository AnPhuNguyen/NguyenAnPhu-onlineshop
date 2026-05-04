// src/pages/OrderDetail.jsx
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useOrderStore } from '../store/orderStore';
import { useAuthStore } from '../store/authStore';
import OrderStatusBadge from '../components/common/OrderStatusBadge';

function formatPrice(price) {
    return price.toLocaleString('vi-VN') + '₫';
}
function formatDate(dt) {
    if (!dt) return null;
    return new Date(dt).toLocaleDateString('vi-VN', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
}

const steps = [
    { key: 'orderTime', label: 'Đặt hàng thành công', icon: 'shopping_bag', pendingIcon: 'schedule' },
    { key: 'acceptTime', label: 'Đã duyệt đơn', icon: 'done', pendingIcon: 'schedule' },
    { key: 'shippedTime', label: 'Đang giao hàng', icon: 'done', pendingIcon: 'local_shipping' },
    { key: 'finishedTime', label: 'Hoàn tất', icon: 'done', pendingIcon: 'task_alt' },
];

export default function OrderDetail() {
    const { id } = useParams();
    const { isAuthenticated } = useAuthStore();
    const { orders, cancelOrder } = useOrderStore();
    const navigate = useNavigate();
    const location = useLocation();
    const successMsg = location.state?.success;

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    const order = orders.find((o) => o.id === Number(id));

    if (!order) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="bg-[#f2f4f6] rounded-xl p-12 text-center text-[#737686]">
                    Không tìm thấy thông tin đơn hàng.
                </div>
            </div>
        );
    }

    const handleCancel = () => {
        if (window.confirm('Bạn có chắc muốn hủy đơn hàng này?')) {
            cancelOrder(order.id);
        }
    };

    const totalAmount = order.details.reduce((sum, d) => sum + d.salePrice * d.quantity, 0);
    const canCancel = order.status === 1 || order.status === 2;

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/orders" className="p-2 hover:bg-[#eceef0] rounded-full transition-all">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1 className="text-3xl font-extrabold" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    Chi tiết đơn hàng #{order.id}
                </h1>
            </div>

            {successMsg && (
                <div className="mb-6 p-4 rounded-xl bg-green-50 text-green-700 border border-green-100 flex items-center gap-3">
                    <span className="material-symbols-outlined">check_circle</span>
                    <p className="font-medium">{successMsg}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left: order info + products */}
                <div className="md:col-span-2 space-y-6">
                    {/* Status + Date */}
                    <div className="bg-white rounded-xl p-8 ambient-shadow">
                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <p className="text-sm font-bold text-[#737686] uppercase tracking-wider mb-1">Trạng thái hiện tại</p>
                                <OrderStatusBadge status={order.status} />
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-[#737686] uppercase tracking-wider mb-1">Ngày đặt</p>
                                <p className="font-bold">{formatDate(order.orderTime)}</p>
                            </div>
                        </div>

                        <div className="border border-[#c3c6d7]/20 rounded-xl p-6">
                            <div className="flex gap-3">
                                <span className="material-symbols-outlined text-[#737686]">location_on</span>
                                <div>
                                    <p className="text-sm font-bold text-[#191c1e]">Địa chỉ giao hàng</p>
                                    <p className="text-sm text-[#434655]">
                                        {order.deliveryAddress}, {order.deliveryProvince}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product list */}
                    <div className="bg-white rounded-xl overflow-hidden ambient-shadow">
                        <div className="p-6 border-b border-[#c3c6d7]">
                            <h2 className="font-bold text-lg">Sản phẩm đã đặt</h2>
                        </div>
                        <div className="divide-y divide-[#c3c6d7]">
                            {order.details.map((item, i) => (
                                <div key={i} className="p-6 flex items-center gap-4">
                                    <div className="w-16 h-16 bg-[#eceef0] rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                                        {item.photo ? (
                                            <img src={item.photo} alt={item.productName} className="object-cover w-full h-full" />
                                        ) : (
                                            <span className="material-symbols-outlined text-[#737686]">inventory_2</span>
                                        )}
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-bold text-[#191c1e]">{item.productName}</p>
                                        <p className="text-sm text-[#737686]">
                                            {item.quantity} x {formatPrice(item.salePrice)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black">{formatPrice(item.salePrice * item.quantity)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 bg-[#f2f4f6] flex justify-between items-center">
                            <span className="font-bold text-[#191c1e]">Tổng cộng</span>
                            <span className="text-2xl font-black text-[#004ac6]">{formatPrice(totalAmount)}</span>
                        </div>
                    </div>
                </div>

                {/* Right: progress + cancel */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl p-8 ambient-shadow">
                        <h2 className="font-bold text-lg mb-6">Tiến độ</h2>
                        <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#c3c6d7]">
                            {steps.map((step) => {
                                const done = !!order[step.key];
                                return (
                                    <div key={step.key} className="relative pl-10">
                                        <div
                                            className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center z-10 ${done ? 'bg-[#004ac6] text-white' : 'bg-[#c3c6d7] text-[#737686]'
                                                }`}
                                        >
                                            <span className="material-symbols-outlined text-xs">
                                                {done ? step.icon : step.pendingIcon}
                                            </span>
                                        </div>
                                        <p className={`text-sm font-bold ${done ? '' : 'text-[#737686]'}`}>{step.label}</p>
                                        {done && (
                                            <p className="text-xs text-[#737686]">{formatDate(order[step.key])}</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {canCancel && (
                        <button
                            onClick={handleCancel}
                            className="w-full bg-red-50 text-red-600 font-bold py-4 rounded-xl hover:bg-red-100 transition-all active:scale-95"
                        >
                            Hủy đơn hàng
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
