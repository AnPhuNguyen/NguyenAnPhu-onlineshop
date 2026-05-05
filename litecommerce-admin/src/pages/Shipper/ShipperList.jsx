// src/pages/Shipper/ShipperList.jsx
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SHIPPERS } from '../../data/mockData';
import usePagination from '../../hooks/usePagination';
import PaginationControls from '../../components/common/PaginationControls';

export default function ShipperList() {
    // Input và keyword tìm kiếm người giao hàng.
    const [searchInput, setSearchInput] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');

    // Danh sách shipper sau khi áp dụng tìm kiếm.
    const filteredShippers = useMemo(() => {
        const keyword = searchKeyword.trim().toLowerCase();
        return SHIPPERS.filter((item) => !keyword || item.name.toLowerCase().includes(keyword));
    }, [searchKeyword]);
    const { currentPage, totalPages, pageItems, setCurrentPage } = usePagination(filteredShippers, 10);

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchKeyword(searchInput);
    };

    return (
        <div>
            {/* Toolbar danh sách người giao hàng */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Người giao hàng</h4>
                <Link to="/shippers/create" className="btn btn-primary"><i className="bi bi-plus-circle me-2"></i> Bổ sung</Link>
            </div>

            {/* Search box theo tên người giao hàng */}
            <div className="card mb-3 shadow-sm border-0">
                <div className="card-body">
                    <form className="row g-2" onSubmit={handleSearch}>
                        <div className="col-md-12">
                            <label className="form-label text-muted small fw-bold">Tìm theo tên người giao hàng</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nhập tên người giao hàng..."
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

            {/* Bảng danh sách shipper */}
            <div className="card shadow-sm border-0">
                <div className="card-body p-0 table-responsive">
                    <table className="table table-hover table-bordered mb-0 align-middle">
                        <thead className="table-light text-secondary">
                            <tr>
                                <th>Tên người giao hàng</th>
                                <th>Điện thoại</th>
                                <th className="text-center" style={{ width: '120px' }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageItems.map(i => (
                                <tr key={i.id}>
                                    <td className="fw-bold">{i.name}</td>
                                    <td>{i.phone}</td>
                                    <td className="text-center">
                                        <Link to={`/shippers/edit/${i.id}`} className="btn btn-sm btn-outline-primary me-1"><i className="bi bi-pencil"></i></Link>
                                        <Link to={`/shippers/delete/${i.id}`} className="btn btn-sm btn-outline-danger"><i className="bi bi-trash"></i></Link>
                                    </td>
                                </tr>
                            ))}
                            {pageItems.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="text-center py-4 text-muted">Không có người giao hàng phù hợp.</td>
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
