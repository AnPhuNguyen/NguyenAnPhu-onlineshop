// src/pages/Order/OrderDetail.jsx
import { useParams, Link } from 'react-router-dom';

export default function OrderDetail() {
    const { id } = useParams();

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Chi tiết đơn hàng #{id}</h4>
                <Link to="/orders" className="btn btn-secondary">
                    <i className="bi bi-arrow-left me-2"></i> Quay lại
                </Link>
            </div>
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    <h5 className="card-title mb-4">Trạng thái xử lý</h5>
                    <div className="d-flex align-items-center mb-3">
                        <span className="badge bg-primary fs-6 me-3">Đơn hàng mới</span>
                        <div>
                            <button className="btn btn-sm btn-outline-info me-2">Chấp nhận</button>
                            <button className="btn btn-sm btn-outline-danger">Từ chối</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
