// src/pages/Product/ProductList.jsx
import { PRODUCTS, CATEGORIES, SUPPLIERS } from '../../data/mockData';

export default function ProductList() {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Quản lý Mặt hàng</h4>
                <button className="btn btn-primary d-flex align-items-center">
                    <i className="bi bi-plus-circle me-2"></i> Bổ sung
                </button>
            </div>

            <div className="card mb-3 shadow-sm border-0">
                <div className="card-body">
                    <form className="row g-2">
                        <div className="col-md-3">
                            <label className="form-label text-muted small fw-bold">Loại hàng</label>
                            <select className="form-select text-sm">
                                <option value="">-- Tất cả --</option>
                                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label text-muted small fw-bold">Nhà cung cấp</label>
                            <select className="form-select text-sm">
                                <option value="">-- Tất cả --</option>
                                {SUPPLIERS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label text-muted small fw-bold">Tên mặt hàng</label>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Nhập tên mặt hàng..." />
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
                                <th className="text-center" style={{ width: '80px' }}>Ảnh</th>
                                <th>Tên mặt hàng</th>
                                <th style={{ width: '120px' }}>Đơn vị</th>
                                <th className="text-end" style={{ width: '150px' }}>Giá</th>
                                <th className="text-center" style={{ width: '140px' }}>Trạng thái</th>
                                <th className="text-center" style={{ width: '120px' }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PRODUCTS.map(p => (
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
                                        <button className="btn btn-sm btn-outline-primary me-1" title="Sửa">
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        <button className="btn btn-sm btn-outline-danger" title="Xóa">
                                            <i className="bi bi-trash"></i>
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
