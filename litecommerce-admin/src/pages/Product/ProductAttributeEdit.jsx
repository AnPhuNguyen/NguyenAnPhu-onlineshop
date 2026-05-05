// src/pages/Product/ProductAttributeEdit.jsx
import { Link, useParams } from 'react-router-dom';

export default function ProductAttributeEdit() {
    const { id, attributeId } = useParams();
    const isEditMode = Boolean(attributeId);

    return (
        <div>
            {/* Toolbar trang chỉnh sửa/thêm thuộc tính */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">{isEditMode ? 'Cập nhật thuộc tính mặt hàng' : 'Thêm thuộc tính mặt hàng'}</h4>
                <Link to={`/products/attributes/${id}`} className="btn btn-secondary">
                    <i className="bi bi-arrow-left me-2"></i> Quay lại
                </Link>
            </div>

            {/* Form thuộc tính */}
            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Tên thuộc tính</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Giá trị thuộc tính</label>
                            <textarea className="form-control" rows={3}></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Thứ tự hiển thị</label>
                            <input type="number" className="form-control" defaultValue={1} />
                        </div>
                        <div className="text-end">
                            <Link to={`/products/attributes/${id}`} className="btn btn-secondary me-2">Hủy</Link>
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
