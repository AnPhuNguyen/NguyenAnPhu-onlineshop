// src/pages/Order/OrderDelete.jsx
import { Link, useParams } from 'react-router-dom';

export default function OrderDelete() {
    const { id } = useParams();

    return (
        <div>
            {/* Trang xóa đơn hàng */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Xóa đơn hàng #{id}</h4>
                <Link to={`/orders/detail/${id}`} className="btn btn-secondary">Quay lại chi tiết</Link>
            </div>
            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <p>Xác nhận xóa đơn hàng khỏi hệ thống.</p>
                    <div className="text-end">
                        <Link to={`/orders/detail/${id}`} className="btn btn-secondary me-2">Hủy</Link>
                        <button className="btn btn-danger">Xác nhận xóa</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
