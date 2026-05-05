// src/pages/Order/OrderList.jsx
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ORDERS, STATUS_LABELS } from '../../data/mockData';
import usePagination from '../../hooks/usePagination';
import PaginationControls from '../../components/common/PaginationControls';

export default function OrderList() {
    // Input/filter cho danh sách đơn hàng.
    const [statusFilter, setStatusFilter] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');

    // Danh sách đơn hàng sau khi áp dụng filter + search.
    const filteredOrders = useMemo(() => {
        const keyword = searchKeyword.trim().toLowerCase();

        return ORDERS.filter((item) => {
            const matchedStatus = !statusFilter || String(item.status) === statusFilter;
            const matchedCustomer = !keyword || item.customer.toLowerCase().includes(keyword);
            return matchedStatus && matchedCustomer;
        });
    }, [statusFilter, searchKeyword]);
    const { currentPage, totalPages, pageItems, setCurrentPage } = usePagination(filteredOrders, 10);

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchKeyword(searchInput);
    };

    return (
        <div>
            {/* Toolbar trang quản lý đơn hàng */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Quản lý Đơn hàng</h4>
                <Link to="/orders/create" className="btn btn-primary">
                    <i className="bi bi-plus-circle me-2"></i> Lập đơn hàng
                </Link>
            </div>

            {/* Khu vực lọc + tìm kiếm đơn hàng */}
            <div className="card mb-3 shadow-sm border-0">
                <div className="card-body">
                    <form className="row g-2" onSubmit={handleSearch}>
                        <div className="col-md-3">
                            <label className="form-label text-muted small fw-bold">Trạng thái</label>
                            <select className="form-select text-sm" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                                <option value="">-- Tất cả --</option>
                                <option value="-2">Bị từ chối</option>
                                <option value="-1">Bị hủy</option>
                                <option value="1">Đơn hàng mới</option>
                                <option value="2">Đã duyệt</option>
                                <option value="3">Đang giao</option>
                                <option value="4">Hoàn tất</option>
                            </select>
                        </div>
                        <div className="col-md-9">
                            <label className="form-label text-muted small fw-bold">Tìm kiếm khách hàng</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nhập tên khách hàng..."
                                    value={searchInput}
                                    onChange={(event) => setSearchInput(event.target.value)}
                                />
                                <button className="btn btn-info text-white" type="submit">
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
                            {pageItems.map(o => (
                                <tr key={o.id}>
                                    <td className="text-center fw-bold text-primary">#{o.id}</td>
                                    <td className="fw-bold">{o.customer}</td>
                                    <td className="text-center text-muted small">{o.time}</td>
                                    <td className="text-end fw-bold text-success">{o.total.toLocaleString('vi-VN')}₫</td>
                                    <td className="text-center">
                                        <span className={STATUS_LABELS[o.status].class}>{STATUS_LABELS[o.status].text}</span>
                                    </td>
                                    <td className="text-center text-nowrap">
                                        <Link to={`/orders/detail/${o.id}`} className="btn btn-sm btn-outline-info" title="Chi tiết">
                                            <i className="bi bi-eye"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {pageItems.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-4 text-muted">Không có đơn hàng phù hợp.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <PaginationControls currentPage={currentPage} totalPages={totalPages} onChangePage={setCurrentPage} />
            </div>
        </div>
    );
}
