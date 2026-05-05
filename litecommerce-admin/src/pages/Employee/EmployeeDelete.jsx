// src/pages/Employee/EmployeeDelete.jsx
import { Link, useParams } from 'react-router-dom';

export default function EmployeeDelete() {
    const { id } = useParams();

    return (
        <div>
            {/* Tiêu đề trang xác nhận xóa */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Xóa nhân viên</h4>
                <Link to="/employees" className="btn btn-secondary">
                    <i className="bi bi-arrow-left me-2"></i> Quay lại
                </Link>
            </div>

            {/* Khối xác nhận hành động xóa */}
            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <p className="mb-1">Bạn có chắc chắn muốn xóa nhân viên có mã:</p>
                    <h5 className="text-danger mb-3">#{id}</h5>
                    <p className="text-muted mb-4">
                        Lưu ý: thao tác này chỉ mô phỏng giao diện xác nhận xóa.
                    </p>

                    <div className="text-end">
                        <Link to="/employees" className="btn btn-secondary me-2">Hủy</Link>
                        <button type="button" className="btn btn-danger">
                            <i className="bi bi-trash me-2"></i> Xác nhận xóa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
