// src/pages/Order/OrderList.jsx
// Trang danh sách đơn hàng – lấy dữ liệu từ backend API
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOrdersApi } from '../../lib/orderApi';
import { useAuthStore } from '../../store/authStore';
import OrderStatusBadge from '../../components/common/OrderStatusBadge';
import Pagination from '../../components/common/Pagination';

const PAGE_SIZE = 10;

const STATUS_TABS = [
    { value: 0, label: 'Tất cả' },
    { value: 1, label: 'Đơn mới' },
    { value: 2, label: 'Đã chấp nhận' },
    { value: 3, label: 'Đang vận chuyển' },
    { value: 4, label: 'Đã hoàn tất' },
    { value: -2, label: 'Bị từ chối' },
    { value: -1, label: 'Đã hủy' },
];

export default function OrderList() {
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const [statusFilter, setStatusFilter] = useState(0);
    const [page, setPage] = useState(1);

    // ─── Lấy danh sách đơn hàng từ API ─────────────────────────────────────────
    const { data, isLoading, isError } = useQuery({
        queryKey: ['orders', { status: statusFilter, page }],
        queryFn: () => getOrdersApi({
            status: statusFilter !== 0 ? statusFilter : undefined,
            page,
            limit: PAGE_SIZE
        }),
        enabled: isAuthenticated,
    });

    const orders = data?.orders ?? [];
    const pagination = data?.pagination ?? { page: 1, totalPages: 1, total: 0 };

    if (!isAuthenticated) {
        navigate('/login', { state: { from: '/orders' } });
        return null;
    }

    const handleStatusChange = (val) => {
        setStatusFilter(val);
        setPage(1);
    };

    const formatDate = (dt) => {
        if (!dt) return '';
        return new Date(dt).toLocaleString('vi-VN', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-extrabold mb-8" style={{ fontFamily: "'Manrope', sans-serif" }}>Đơn hàng của tôi</h1>

            {/* Bộ lọc trạng thái */}
            <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {STATUS_TABS.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => handleStatusChange(tab.value)}
                        className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${statusFilter === tab.value
                            ? 'primary-gradient text-white shadow-lg shadow-blue-500/20'
                            : 'bg-white text-[#191c1e] hover:bg-surface-container-low ambient-shadow'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center min-h-64 text-outline gap-4">
                    <span className="material-symbols-outlined text-5xl animate-spin">progress_activity</span>
                    <p className="font-medium">Đang tải danh sách đơn hàng...</p>
                </div>
            ) : isError ? (
                <div className="bg-red-50 p-8 rounded-2xl text-center text-red-700">
                    <span className="material-symbols-outlined text-5xl mb-4">error</span>
                    <p className="font-bold text-lg">Không thể tải danh sách đơn hàng</p>
                    <p className="text-sm opacity-75">Vui lòng thử lại sau</p>
                </div>
            ) : orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-64 text-outline gap-4">
                    <span className="material-symbols-outlined text-7xl">receipt_long</span>
                    <p className="text-xl font-medium">Bạn chưa có đơn hàng nào trong mục này</p>
                    <Link to="/products" className="primary-gradient text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all">Mua hàng ngay</Link>
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div
                                key={order.orderId}
                                className="bg-white rounded-xl p-6 ambient-shadow flex items-center justify-between gap-4 border border-transparent hover:border-primary/20 transition-all group"
                            >
                                <div className="min-w-0">
                                    <p className="font-bold text-[#191c1e] text-lg">Đơn #{order.orderId}</p>
                                    <p className="text-sm text-outline mt-1">{formatDate(order.orderTime)}</p>
                                    <p className="text-sm text-outline mt-1 flex items-center gap-1 truncate max-w-md">
                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                        {order.deliveryAddress}, {order.deliveryProvince}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 shrink-0">
                                    <OrderStatusBadge status={order.orderStatus} />
                                    <Link
                                        to={`/orders/detail/${order.orderId}`}
                                        className="text-primary font-bold text-sm px-4 py-2 hover:bg-surface-container-low rounded-lg transition-all flex items-center gap-1 group-hover:gap-2"
                                    >
                                        Chi tiết
                                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination page={pagination.page} pageCount={pagination.totalPages} onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
                </>
            )}
        </div>
    );
}
