// src/pages/Product/ProductEdit.jsx
import { useParams, Link } from 'react-router-dom';

export default function ProductEdit() {
    const { id } = useParams();
    const isEditing = id !== 'create' && id != null;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">{isEditing ? 'Cập nhật mặt hàng' : 'Bổ sung mặt hàng'}</h4>
                <Link to="/products" className="btn btn-secondary">
                    <i className="bi bi-arrow-left me-2"></i> Quay lại
                </Link>
            </div>
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Tên mặt hàng</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Loại hàng</label>
                                <select className="form-select"></select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Nhà cung cấp</label>
                                <select className="form-select"></select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Đơn vị</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Giá</label>
                                <input type="number" className="form-control" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mô tả</label>
                            <textarea className="form-control" rows="3"></textarea>
                        </div>
                        <div className="mb-3">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="isSelling" defaultChecked />
                                <label className="form-check-label" htmlFor="isSelling">Trạng thái (Đang bán / Ngừng bán)</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Ảnh mặt hàng</label>
                            <input type="file" className="form-control" />
                        </div>
                        <div className="text-end mt-4">
                            <Link to="/products" className="btn btn-secondary me-2">Hủy</Link>
                            <button type="submit" className="btn btn-primary">
                                <i className="bi bi-save me-2"></i> Lưu dữ liệu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
