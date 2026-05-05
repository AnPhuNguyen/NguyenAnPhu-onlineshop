// src/pages/Product/ProductPhotoEdit.jsx
import { Link, useParams } from 'react-router-dom';

export default function ProductPhotoEdit() {
    const { id, photoId } = useParams();
    const isEditMode = Boolean(photoId);

    return (
        <div>
            {/* Toolbar trang thêm/cập nhật ảnh sản phẩm */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">{isEditMode ? 'Cập nhật ảnh mặt hàng' : 'Thêm ảnh mặt hàng'}</h4>
                <Link to={`/products/photos/${id}`} className="btn btn-secondary">
                    <i className="bi bi-arrow-left me-2"></i> Quay lại
                </Link>
            </div>

            {/* Form thông tin ảnh */}
            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Tải file ảnh</label>
                            <input type="file" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Hoặc nhập URL ảnh</label>
                            <input type="text" className="form-control" placeholder="https://..." />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mô tả ảnh</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Thứ tự hiển thị</label>
                            <input type="number" className="form-control" defaultValue={1} />
                        </div>
                        <div className="mb-3">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="isHidden" />
                                <label className="form-check-label" htmlFor="isHidden">Ẩn ảnh</label>
                            </div>
                        </div>
                        <div className="text-end">
                            <Link to={`/products/photos/${id}`} className="btn btn-secondary me-2">Hủy</Link>
                            <button className="btn btn-primary" type="submit">
                                <i className="bi bi-save me-2"></i>Lưu dữ liệu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
