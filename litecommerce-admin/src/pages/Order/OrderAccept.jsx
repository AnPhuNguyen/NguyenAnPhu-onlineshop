// src/pages/Order/OrderAccept.jsx
import { Link, useParams } from 'react-router-dom';

export default function OrderAccept() {
    const { id } = useParams();

    return (
        <div>
            {/* Trang xác nhận duyệt đơn */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Duyệt đơn hàng #{id}</h4>
                <Link to={`/orders/detail/${id}`} className="btn btn-secondary">Quay lại chi tiết</Link>
            </div>
            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <p>Xác nhận chuyển đơn hàng sang trạng thái <strong>Đã duyệt</strong>.</p>
                    <div className="text-end">
                        <Link to={`/orders/detail/${id}`} className="btn btn-secondary me-2">Hủy</Link>
                        <button className="btn btn-primary">Xác nhận</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
