// src/components/common/OrderStatusBadge.jsx
import { ORDER_STATUS } from '../../data/mockData';

export default function OrderStatusBadge({ status }) {
    const info = ORDER_STATUS[String(status)] || { label: 'Không xác định', color: 'bg-gray-100 text-gray-700' };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${info.color}`}>
            {info.label}
        </span>
    );
}
