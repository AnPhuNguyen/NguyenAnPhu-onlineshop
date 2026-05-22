// src/pages/Order/OrderDetail.jsx
// Trang chi tiết đơn hàng – đồng bộ hoàn toàn với backend
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getOrderDetailApi } from '../../lib/orderApi';
import { useOrderStore } from '../../store/orderStore';
import { useAuthStore } from '../../store/authStore';
import OrderStatusBadge from '../../components/common/OrderStatusBadge';

function formatPrice(price) {
    return Number(price).toLocaleString('vi-VN') + '₫';
}

function formatDate(dt) {
    if (!dt) return null;
    return new Date(dt).toLocaleString('vi-VN', {
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
    const { cancelOrder } = useOrderStore();
    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient();
    const successMsg = location.state?.success;

    // ─── Lấy chi tiết đơn hàng từ API ─────────────────────────────────────────
    const { data: order, isLoading, isError } = useQuery({
        queryKey: ['order-detail', id],
        queryFn: () => getOrderDetailApi(id),
        enabled: isAuthenticated && !!id,
    });

    if (!isAuthenticated) {
        navigate('/login', { state: { from: `/orders/detail/${id}` } });
        return null;
    }

    const handleCancel = async () => {
        if (window.confirm('Bạn có chắc muốn hủy đơn hàng này?')) {
            const result = await cancelOrder(order.orderId);
            if (result.success) {
                queryClient.invalidateQueries(['order-detail', id]);
            } else {
                alert(result.message);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col items-center gap-4 text-outline">
                <span className="material-symbols-outlined text-5xl animate-spin">progress_activity</span>
                <p className="font-medium">Đang tải thông tin đơn hàng...</p>
            </div>
        );
    }

    if (isError || !order) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="bg-surface-container-low rounded-2xl p-12 text-center text-outline">
                    <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
                    <p className="text-lg">Không tìm thấy thông tin đơn hàng.</p>
                    <Link to="/orders" className="text-primary font-bold hover:underline mt-4 inline-block">Quay lại danh sách đơn hàng</Link>
                </div>
            </div>
        );
    }

    const totalAmount = (order.details || []).reduce((sum, d) => sum + d.salePrice * d.quantity, 0);
    // Chỉ cho phép hủy khi đơn mới (1) hoặc đã duyệt (2)
    const canCancel = order.orderStatus === 1 || order.orderStatus === 2;

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/orders" className="p-2 hover:bg-surface-container rounded-full transition-all group">
                    <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
                </Link>
                <h1 className="text-3xl font-extrabold" style={{ fontFamily: "'Manrope', sans-serif" }}>Chi tiết đơn hàng #{order.orderId}</h1>
            </div>

            {successMsg && (
                <div className="mb-6 p-4 rounded-xl bg-green-50 text-green-700 border border-green-100 flex items-center gap-3 animate-bounce-subtle">
                    <span className="material-symbols-outlined">check_circle</span>
                    <p className="font-medium">{successMsg}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Cột trái: Thông tin & Sản phẩm */}
                <div className="md:col-span-2 space-y-6">
                    {/* Trạng thái & Ngày đặt */}
                    <div className="bg-white rounded-xl p-8 ambient-shadow">
                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <p className="text-sm font-bold text-outline uppercase tracking-wider mb-2">Trạng thái</p>
                                <OrderStatusBadge status={order.orderStatus} />
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-outline uppercase tracking-wider mb-1">Ngày đặt</p>
                                <p className="font-bold text-[#191c1e]">{formatDate(order.orderTime)}</p>
                            </div>
                        </div>

                        <div className="border border-outline-variant/20 rounded-xl p-6 bg-[#f8f9fa]">
                            <div className="flex gap-3">
                                <span className="material-symbols-outlined text-outline">location_on</span>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-[#191c1e] mb-1">Địa chỉ giao hàng</p>
                                    <p className="text-sm text-on-surface-variant leading-relaxed">
                                        {order.deliveryAddress}, {order.deliveryProvince}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Danh sách sản phẩm */}
                    <div className="bg-white rounded-xl overflow-hidden ambient-shadow">
                        <div className="p-6 border-b border-outline-variant/50 bg-gray-50/50">
                            <h2 className="font-bold text-lg">Sản phẩm đã đặt</h2>
                        </div>
                        <div className="divide-y divide-outline-variant/30">
                            {(order.details || []).map((item, i) => (
                                <div key={i} className="p-6 flex items-center gap-4">
                                    <div className="w-16 h-16 bg-surface-container rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                                        {item.photo ? (
                                            <img src={item.photo} alt={item.productName} className="object-cover w-full h-full" />
                                        ) : (
                                            <span className="material-symbols-outlined text-outline">inventory_2</span>
                                        )}
                                    </div>
                                    <div className="grow min-w-0">
                                        <p className="font-bold text-[#191c1e] truncate">{item.productName}</p>
                                        <p className="text-sm text-outline">
                                            {item.quantity} x {formatPrice(item.salePrice)}
                                        </p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="font-black text-[#191c1e] font-mono">{formatPrice(item.salePrice * item.quantity)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 bg-surface-container-low flex justify-between items-center border-t border-outline-variant/50">
                            <span className="font-bold text-[#191c1e]">Tổng cộng</span>
                            <span className="text-2xl font-black text-primary font-mono">{formatPrice(totalAmount)}</span>
                        </div>
                    </div>
                </div>

                {/* Cột phải: Tiến độ & Thao tác */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl p-8 ambient-shadow">
                        <h2 className="font-bold text-lg mb-6">Tiến độ</h2>
                        <div className="space-y-8 relative before:absolute before:left-2.75 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                            {steps.map((step) => {
                                const done = !!order[step.key];
                                return (
                                    <div key={step.key} className="relative pl-10">
                                        <div
                                            className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center z-10 transition-colors ${done ? 'bg-primary text-white shadow-md' : 'bg-gray-200 text-gray-400'
                                                }`}
                                        >
                                            <span className="material-symbols-outlined text-[14px]">
                                                {done ? step.icon : step.pendingIcon}
                                            </span>
                                        </div>
                                        <p className={`text-sm font-bold ${done ? 'text-[#191c1e]' : 'text-outline'}`}>{step.label}</p>
                                        {done && (
                                            <p className="text-xs text-outline mt-0.5">{formatDate(order[step.key])}</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {canCancel && (
                        <button
                            onClick={handleCancel}
                            className="w-full bg-red-50 text-error font-bold py-4 rounded-xl border border-red-100 hover:bg-red-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-xl">cancel</span>
                            Hủy đơn hàng
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
