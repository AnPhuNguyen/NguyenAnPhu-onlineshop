// src/pages/OrderList.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useOrderStore } from '../../store/orderStore';
import { useAuthStore } from '../../store/authStore';
import { ORDER_STATUS } from '../../data/mockData';
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
    const { orders } = useOrderStore();
    const navigate = useNavigate();
    const [statusFilter, setStatusFilter] = useState(0);
    const [page, setPage] = useState(1);

    if (!isAuthenticated) {
        navigate('/login', { state: { from: '/orders' } });
        return null;
    }

    const filtered = statusFilter === 0 ? orders : orders.filter((o) => o.status === statusFilter);
    const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handleStatusChange = (val) => {
        setStatusFilter(val);
        setPage(1);
    };

    const formatDate = (dt) => {
        if (!dt) return '';
        return new Date(dt).toLocaleDateString('vi-VN', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-extrabold mb-8" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Đơn hàng của tôi
            </h1>

            {/* Status tabs */}
            <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
                {STATUS_TABS.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => handleStatusChange(tab.value)}
                        className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${statusFilter === tab.value
                            ? 'primary-gradient text-white'
                            : 'bg-white text-[#191c1e] hover:bg-[#f2f4f6] ambient-shadow'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {paged.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-64 text-[#737686] gap-4">
                    <span className="material-symbols-outlined text-7xl">receipt_long</span>
                    <p className="text-xl font-medium">Bạn chưa có đơn hàng nào</p>
                    <Link
                        to="/products"
                        className="primary-gradient text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all"
                    >
                        Mua hàng ngay
                    </Link>
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {paged.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white rounded-xl p-6 ambient-shadow flex items-center justify-between gap-4"
                            >
                                <div>
                                    <p className="font-bold text-[#191c1e]">Đơn #{order.id}</p>
                                    <p className="text-sm text-[#737686] mt-1">{formatDate(order.orderTime)}</p>
                                    <p className="text-sm text-[#737686] mt-1 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                        {order.deliveryAddress}, {order.deliveryProvince}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 flex-shrink-0">
                                    <OrderStatusBadge status={order.status} />
                                    <Link
                                        to={`/orders/detail/${order.id}`}
                                        className="text-[#004ac6] font-bold text-sm hover:underline flex items-center gap-1"
                                    >
                                        Xem chi tiết
                                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination page={page} pageCount={pageCount} onChange={setPage} />
                </>
            )}
        </div>
    );
}
