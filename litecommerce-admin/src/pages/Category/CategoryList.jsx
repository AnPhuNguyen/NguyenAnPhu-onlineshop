// src/pages/Category/CategoryList.jsx
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/mockData';
import usePagination from '../../hooks/usePagination';
import PaginationControls from '../../components/common/PaginationControls';

export default function CategoryList() {
    // Input tìm kiếm theo tên loại hàng.
    const [searchInput, setSearchInput] = useState('');
    // Từ khóa tìm kiếm đã submit.
    const [searchKeyword, setSearchKeyword] = useState('');

    // Danh sách category sau khi lọc theo tên.
    const filteredCategories = useMemo(() => {
        const keyword = searchKeyword.trim().toLowerCase();
        return CATEGORIES.filter((item) => !keyword || item.name.toLowerCase().includes(keyword));
    }, [searchKeyword]);
    const { currentPage, totalPages, pageItems, setCurrentPage } = usePagination(filteredCategories, 10);

    // Submit ô tìm kiếm.
    const handleSearch = (event) => {
        event.preventDefault();
        setSearchKeyword(searchInput);
    };

    return (
        <div>
            {/* Toolbar trang loại hàng */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Loại hàng</h4>
                <Link to="/categories/create" className="btn btn-primary d-flex align-items-center">
                    <i className="bi bi-plus-circle me-2"></i> Bổ sung
                </Link>
            </div>

            {/* Khu vực tìm kiếm loại hàng theo tên */}
            <div className="card mb-3 shadow-sm border-0">
                <div className="card-body">
                    <form className="row g-2" onSubmit={handleSearch}>
                        <div className="col-md-12">
                            <label className="form-label text-muted small fw-bold">Tìm theo tên loại hàng</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nhập tên loại hàng..."
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

            {/* Bảng danh sách loại hàng */}
            <div className="card shadow-sm border-0">
                <div className="card-body p-0 table-responsive">
                    <table className="table table-hover table-bordered mb-0 align-middle">
                        <thead className="table-light text-secondary">
                            <tr>
                                <th>Loại hàng</th>
                                <th className="text-center" style={{ width: '120px' }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageItems.map(i => (
                                <tr key={i.id}>
                                    <td className="fw-bold">{i.name}</td>
                                    <td className="text-center">
                                        <Link to={`/categories/edit/${i.id}`} className="btn btn-sm btn-outline-primary me-1"><i className="bi bi-pencil"></i></Link>
                                        <Link to={`/categories/delete/${i.id}`} className="btn btn-sm btn-outline-danger"><i className="bi bi-trash"></i></Link>
                                    </td>
                                </tr>
                            ))}
                            {pageItems.length === 0 && (
                                <tr>
                                    <td colSpan={2} className="text-center py-4 text-muted">Không có loại hàng phù hợp.</td>
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
