// src/pages/Employee/EmployeeChangePassword.jsx
import { Link, useParams } from 'react-router-dom';

export default function EmployeeChangePassword() {
    const { id } = useParams();

    return (
        <div>
            {/* Toolbar trang đổi mật khẩu nhân viên */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Đổi mật khẩu nhân viên</h4>
                <Link to="/employees" className="btn btn-secondary">
                    <i className="bi bi-arrow-left me-2"></i> Quay lại
                </Link>
            </div>

            {/* Form đổi mật khẩu */}
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <div className="alert alert-info py-2">
                        Đang thao tác cho nhân viên ID: <strong>#{id}</strong>
                    </div>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Mật khẩu mới</label>
                            <input type="password" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Xác nhận mật khẩu mới</label>
                            <input type="password" className="form-control" />
                        </div>
                        <div className="text-end mt-4">
                            <Link to="/employees" className="btn btn-secondary me-2">Hủy</Link>
                            <button type="submit" className="btn btn-warning">
                                <i className="bi bi-key me-2"></i> Cập nhật mật khẩu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
