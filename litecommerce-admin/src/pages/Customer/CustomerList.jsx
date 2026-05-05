// src/pages/Customer/CustomerList.jsx
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CUSTOMERS, PROVINCES } from '../../data/mockData';
import usePagination from '../../hooks/usePagination';
import PaginationControls from '../../components/common/PaginationControls';

export default function CustomerList() {
    // Bộ lọc tỉnh thành.
    const [provinceFilter, setProvinceFilter] = useState('');
    // Bộ lọc trạng thái khóa.
    const [lockStatusFilter, setLockStatusFilter] = useState('');
    // Input tên khách hàng.
    const [searchInput, setSearchInput] = useState('');
    // Keyword đã submit.
    const [searchKeyword, setSearchKeyword] = useState('');

    // Danh sách khách hàng sau khi filter + search.
    const filteredCustomers = useMemo(() => {
        const keyword = searchKeyword.trim().toLowerCase();

        return CUSTOMERS.filter((item) => {
            const matchedProvince = !provinceFilter || item.province === provinceFilter;
            const matchedLockStatus =
                !lockStatusFilter ||
                (lockStatusFilter === 'locked' ? item.isLocked : !item.isLocked);
            const matchedName = !keyword || item.name.toLowerCase().includes(keyword);

            return matchedProvince && matchedLockStatus && matchedName;
        });
    }, [provinceFilter, lockStatusFilter, searchKeyword]);
    const { currentPage, totalPages, pageItems, setCurrentPage } = usePagination(filteredCustomers, 10);

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchKeyword(searchInput);
    };

    return (
        <div>
            {/* Toolbar danh sách khách hàng */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Khách hàng</h4>
                <Link to="/customers/create" className="btn btn-primary"><i className="bi bi-plus-circle me-2"></i> Bổ sung</Link>
            </div>

            {/* Bộ lọc + tìm kiếm khách hàng */}
            <div className="card mb-3 shadow-sm border-0">
                <div className="card-body">
                    <form className="row g-2" onSubmit={handleSearch}>
                        <div className="col-md-3">
                            <label className="form-label text-muted small fw-bold">Tỉnh thành</label>
                            <select className="form-select" value={provinceFilter} onChange={(event) => setProvinceFilter(event.target.value)}>
                                <option value="">-- Tất cả --</option>
                                {PROVINCES.map((item) => (
                                    <option key={item.name} value={item.name}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label text-muted small fw-bold">Trạng thái khóa</label>
                            <select className="form-select" value={lockStatusFilter} onChange={(event) => setLockStatusFilter(event.target.value)}>
                                <option value="">-- Tất cả --</option>
                                <option value="active">Hoạt động</option>
                                <option value="locked">Khóa</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label text-muted small fw-bold">Tìm theo tên khách hàng</label>
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

            {/* Bảng danh sách khách hàng */}
            <div className="card shadow-sm border-0">
                <div className="card-body p-0 table-responsive">
                    <table className="table table-hover table-bordered mb-0 align-middle">
                        <thead className="table-light text-secondary">
                            <tr>
                                <th>Tên khách hàng</th>
                                <th>Tỉnh/Thành</th>
                                <th>Điện thoại</th>
                                <th>Email</th>
                                <th className="text-center">Trạng thái khóa</th>
                                <th className="text-center" style={{ width: '120px' }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageItems.map(i => (
                                <tr key={i.id}>
                                    <td className="fw-bold">{i.name}</td>
                                    <td>{i.province}</td>
                                    <td>{i.phone}</td>
                                    <td>{i.email}</td>
                                    <td className="text-center">
                                        {i.isLocked ? <span className="badge bg-danger">Khóa</span> : <span className="badge bg-success">Hoạt động</span>}
                                    </td>
                                    <td className="text-center text-nowrap">
                                        <Link to={`/customers/edit/${i.id}`} className="btn btn-sm btn-outline-primary me-1"><i className="bi bi-pencil"></i></Link>
                                        <Link to={`/customers/change-password/${i.id}`} className="btn btn-sm btn-outline-warning me-1"><i className="bi bi-key"></i></Link>
                                        <Link to={`/customers/delete/${i.id}`} className="btn btn-sm btn-outline-danger"><i className="bi bi-trash"></i></Link>
                                    </td>
                                </tr>
                            ))}
                            {pageItems.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-4 text-muted">Không có khách hàng phù hợp.</td>
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
