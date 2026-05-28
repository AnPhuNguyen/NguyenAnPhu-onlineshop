// src/components/common/OrderStatusBadge.jsx
// Badge hiển thị trạng thái đơn hàng với màu sắc tương ứng
import { getStatusInfo } from '../../data/orderStatus';

export default function OrderStatusBadge({ status }) {
    const info = getStatusInfo(status);

    return (
        <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${info.color}`}>
            {info.label}
        </span>
    );
}
