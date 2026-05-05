// src/pages/Product/ProductList.jsx
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES, SUPPLIERS, PRODUCT_META } from '../../data/mockData';
import usePagination from '../../hooks/usePagination';
import PaginationControls from '../../components/common/PaginationControls';

export default function ProductList() {
    // Bộ lọc loại hàng.
    const [categoryFilter, setCategoryFilter] = useState('');
    // Bộ lọc nhà cung cấp.
    const [supplierFilter, setSupplierFilter] = useState('');
    // Giá trị input tìm kiếm theo tên sản phẩm.
    const [searchInput, setSearchInput] = useState('');
    // Từ khóa đã submit bằng nút Tìm kiếm.
    const [searchKeyword, setSearchKeyword] = useState('');

    // Chỉ mục ánh xạ sản phẩm -> category/supplier (dùng tạm theo mock id).
    const productMetaMap = useMemo(() => PRODUCT_META, []);

    // Danh sách sản phẩm sau khi áp dụng filter + search.
    const filteredProducts = useMemo(() => {
        const normalizedKeyword = searchKeyword.trim().toLowerCase();

        return PRODUCTS.filter((product) => {
            const meta = productMetaMap[product.id] || {};
            const matchedCategory = !categoryFilter || String(meta.categoryId) === categoryFilter;
            const matchedSupplier = !supplierFilter || String(meta.supplierId) === supplierFilter;
            const matchedName =
                !normalizedKeyword || product.name.toLowerCase().includes(normalizedKeyword);

            return matchedCategory && matchedSupplier && matchedName;
        });
    }, [categoryFilter, supplierFilter, searchKeyword, productMetaMap]);
    const { currentPage, totalPages, pageItems, setCurrentPage } = usePagination(filteredProducts, 10);

    // Submit form tìm kiếm sản phẩm theo tên.
    const handleSearch = (event) => {
        event.preventDefault();
        setSearchKeyword(searchInput);
    };

    // Xóa toàn bộ điều kiện lọc/tìm kiếm.
    const handleResetFilters = () => {
        setCategoryFilter('');
        setSupplierFilter('');
        setSearchInput('');
        setSearchKeyword('');
    };

    return (
        <div>
            {/* Toolbar chính của trang danh sách mặt hàng */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Quản lý Mặt hàng</h4>
                <Link to="/products/create" className="btn btn-primary d-flex align-items-center">
                    <i className="bi bi-plus-circle me-2"></i> Bổ sung
                </Link>
            </div>

            {/* Khu vực filter + search mặt hàng */}
            <div className="card mb-3 shadow-sm border-0">
                <div className="card-body">
                    <form className="row g-2" onSubmit={handleSearch}>
                        {/* Filter theo loại hàng */}
                        <div className="col-md-3">
                            <label className="form-label text-muted small fw-bold">Loại hàng</label>
                            <select
                                className="form-select text-sm"
                                value={categoryFilter}
                                onChange={(event) => setCategoryFilter(event.target.value)}
                            >
                                <option value="">-- Tất cả --</option>
                                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        {/* Filter theo nhà cung cấp */}
                        <div className="col-md-3">
                            <label className="form-label text-muted small fw-bold">Nhà cung cấp</label>
                            <select
                                className="form-select text-sm"
                                value={supplierFilter}
                                onChange={(event) => setSupplierFilter(event.target.value)}
                            >
                                <option value="">-- Tất cả --</option>
                                {SUPPLIERS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                        {/* Search box theo tên mặt hàng */}
                        <div className="col-md-6">
                            <label className="form-label text-muted small fw-bold">Tên mặt hàng</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nhập tên mặt hàng..."
                                    value={searchInput}
                                    onChange={(event) => setSearchInput(event.target.value)}
                                />
                                <button className="btn btn-info text-white" type="submit">
                                    <i className="bi bi-search"></i>
                                </button>
                                <button className="btn btn-outline-secondary" type="button" onClick={handleResetFilters}>
                                    Đặt lại
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Bảng danh sách sản phẩm */}
            <div className="card shadow-sm border-0">
                <div className="card-body p-0 table-responsive">
                    <table className="table table-hover table-bordered mb-0 align-middle">
                        <thead className="table-light text-secondary">
                            <tr>
                                <th className="text-center" style={{ width: '80px' }}>Ảnh</th>
                                <th>Tên mặt hàng</th>
                                <th style={{ width: '120px' }}>Đơn vị</th>
                                <th className="text-end" style={{ width: '150px' }}>Giá</th>
                                <th className="text-center" style={{ width: '140px' }}>Trạng thái</th>
                                <th className="text-center" style={{ width: '120px' }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageItems.map(p => (
                                <tr key={p.id}>
                                    <td className="text-center">
                                        <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ width: 64, height: 64 }}>
                                            <i className="bi bi-box text-muted fs-3"></i>
                                        </div>
                                    </td>
                                    <td className="fw-bold">{p.name}</td>
                                    <td>{p.unit}</td>
                                    <td className="text-end fw-bold text-primary">{p.price.toLocaleString('vi-VN')}₫</td>
                                    <td className="text-center">
                                        {p.isSelling ? (
                                            <span className="badge bg-success">Đang bán</span>
                                        ) : (
                                            <span className="badge bg-danger">Ngừng bán</span>
                                        )}
                                    </td>
                                    <td className="text-center text-nowrap">
                                        {/* Các action chính của từng dòng dữ liệu */}
                                        <Link to={`/products/edit/${p.id}`} className="btn btn-sm btn-outline-primary me-1" title="Sửa">
                                            <i className="bi bi-pencil"></i>
                                        </Link>
                                        <Link to={`/products/attributes/${p.id}`} className="btn btn-sm btn-outline-info me-1" title="Thuộc tính">
                                            <i className="bi bi-list-check"></i>
                                        </Link>
                                        <Link to={`/products/photos/${p.id}`} className="btn btn-sm btn-outline-warning me-1" title="Ảnh sản phẩm">
                                            <i className="bi bi-images"></i>
                                        </Link>
                                        <Link to={`/products/delete/${p.id}`} className="btn btn-sm btn-outline-danger" title="Xóa">
                                            <i className="bi bi-trash"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {pageItems.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center text-muted py-4">
                                        Không tìm thấy mặt hàng phù hợp với điều kiện lọc.
                                    </td>
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
