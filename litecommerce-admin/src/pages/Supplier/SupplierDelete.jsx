// src/pages/Supplier/SupplierDelete.jsx
import { Link, useParams } from 'react-router-dom';

export default function SupplierDelete() {
    const { id } = useParams();

    return (
        <div>
            {/* Trang xác nhận xóa nhà cung cấp */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Xóa nhà cung cấp</h4>
                <Link to="/suppliers" className="btn btn-secondary">
                    <i className="bi bi-arrow-left me-2"></i> Quay lại
                </Link>
            </div>
            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <p>Bạn có chắc chắn muốn xóa nhà cung cấp mã #{id}?</p>
                    <div className="text-end">
                        <Link to="/suppliers" className="btn btn-secondary me-2">Hủy</Link>
                        <button className="btn btn-danger" type="button">Xác nhận xóa</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
