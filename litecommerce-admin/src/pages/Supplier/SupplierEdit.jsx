// src/pages/Supplier/SupplierEdit.jsx
import { useParams, Link } from 'react-router-dom';

export default function SupplierEdit() {
    const { id } = useParams();
    const isEditing = id !== 'create' && id != null;

    return (
        <div>
            {/* Toolbar trang thêm/sửa nhà cung cấp */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">{isEditing ? 'Cập nhật nhà cung cấp' : 'Bổ sung nhà cung cấp'}</h4>
                <Link to="/suppliers" className="btn btn-secondary"><i className="bi bi-arrow-left me-2"></i> Quay lại</Link>
            </div>
            {/* Form thông tin nhà cung cấp */}
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Tên nhà cung cấp</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tên người liên hệ</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="text-end mt-4">
                            <Link to="/suppliers" className="btn btn-secondary me-2">Hủy</Link>
                            <button type="submit" className="btn btn-primary"><i className="bi bi-save me-2"></i> Lưu dữ liệu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
