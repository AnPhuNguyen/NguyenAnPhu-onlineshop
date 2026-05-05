// src/pages/Order/OrderList.jsx
import { ORDERS, STATUS_LABELS } from '../../data/mockData';

export default function OrderList() {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Quản lý Đơn hàng</h4>
            </div>

            <div className="card mb-3 shadow-sm border-0">
                <div className="card-body">
                    <form className="row g-2">
                        <div className="col-md-3">
                            <label className="form-label text-muted small fw-bold">Trạng thái</label>
                            <select className="form-select text-sm">
                                <option value="">-- Tất cả --</option>
                                <option value="1">Đơn hàng mới</option>
                                <option value="2">Đã duyệt</option>
                                <option value="3">Đang giao</option>
                                <option value="4">Hoàn tất</option>
                            </select>
                        </div>
                        <div className="col-md-9">
                            <label className="form-label text-muted small fw-bold">Tìm kiếm khách hàng</label>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Nhập tên khách hàng..." />
                                <button className="btn btn-info text-white" type="button">
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body p-0 table-responsive">
                    <table className="table table-hover table-bordered mb-0 align-middle">
                        <thead className="table-light text-secondary">
                            <tr>
                                <th className="text-center" style={{ width: '80px' }}>Mã ĐH</th>
                                <th>Khách hàng</th>
                                <th className="text-center" style={{ width: '150px' }}>Thời điểm đặt</th>
                                <th className="text-end" style={{ width: '150px' }}>Tổng tiền</th>
                                <th className="text-center" style={{ width: '150px' }}>Trạng thái</th>
                                <th className="text-center" style={{ width: '100px' }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ORDERS.map(o => (
                                <tr key={o.id}>
                                    <td className="text-center fw-bold text-primary">#{o.id}</td>
                                    <td className="fw-bold">{o.customer}</td>
                                    <td className="text-center text-muted small">{o.time}</td>
                                    <td className="text-end fw-bold text-success">{o.total.toLocaleString('vi-VN')}₫</td>
                                    <td className="text-center">
                                        <span className={STATUS_LABELS[o.status].class}>{STATUS_LABELS[o.status].text}</span>
                                    </td>
                                    <td className="text-center text-nowrap">
                                        <button className="btn btn-sm btn-outline-info" title="Chi tiết">
                                            <i className="bi bi-eye"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
