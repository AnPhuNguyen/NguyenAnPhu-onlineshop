// src/pages/Order/OrderDetail.jsx
import { useParams, Link } from 'react-router-dom';
import { ORDER_DETAILS } from '../../data/mockData';

export default function OrderDetail() {
    const { id } = useParams();
    const details = ORDER_DETAILS.filter((item) => String(item.orderId) === String(id));
    const total = details.reduce((sum, item) => sum + item.quantity * item.salePrice, 0);

    return (
        <div>
            {/* Toolbar trang chi tiết đơn hàng */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Chi tiết đơn hàng #{id}</h4>
                <Link to="/orders" className="btn btn-secondary">
                    <i className="bi bi-arrow-left me-2"></i> Quay lại
                </Link>
            </div>

            {/* Khối thao tác trạng thái đơn hàng */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    <h5 className="card-title mb-4">Trạng thái xử lý</h5>
                    <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                        <span className="badge bg-primary fs-6 me-3">Đơn hàng mới</span>
                        <div className="d-flex flex-wrap gap-2">
                            <Link to={`/orders/accept/${id}`} className="btn btn-sm btn-outline-info">Chấp nhận</Link>
                            <Link to={`/orders/reject/${id}`} className="btn btn-sm btn-outline-danger">Từ chối</Link>
                            <Link to={`/orders/shipping/${id}`} className="btn btn-sm btn-outline-primary">Chuyển giao</Link>
                            <Link to={`/orders/finish/${id}`} className="btn btn-sm btn-outline-success">Hoàn tất</Link>
                            <Link to={`/orders/cancel/${id}`} className="btn btn-sm btn-outline-warning">Hủy đơn</Link>
                            <Link to={`/orders/delete/${id}`} className="btn btn-sm btn-outline-danger">Xóa đơn</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bảng chi tiết mặt hàng trong đơn */}
            <div className="card shadow-sm border-0">
                <div className="card-body p-0 table-responsive">
                    <table className="table table-hover table-bordered mb-0 align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Sản phẩm</th>
                                <th className="text-center" style={{ width: '120px' }}>Số lượng</th>
                                <th className="text-end" style={{ width: '150px' }}>Đơn giá</th>
                                <th className="text-end" style={{ width: '180px' }}>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.map((item) => (
                                <tr key={`${item.orderId}-${item.productId}`}>
                                    <td className="fw-bold">{item.productName}</td>
                                    <td className="text-center">{item.quantity}</td>
                                    <td className="text-end">{item.salePrice.toLocaleString('vi-VN')}₫</td>
                                    <td className="text-end fw-bold">{(item.quantity * item.salePrice).toLocaleString('vi-VN')}₫</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={3} className="text-end fw-bold">Tổng cộng</td>
                                <td className="text-end fw-bold text-primary">{total.toLocaleString('vi-VN')}₫</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
