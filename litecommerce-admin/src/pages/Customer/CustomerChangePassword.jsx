// src/pages/Customer/CustomerChangePassword.jsx
import { Link, useParams } from 'react-router-dom';

export default function CustomerChangePassword() {
    const { id } = useParams();

    return (
        <div>
            {/* Toolbar trang đổi mật khẩu khách hàng */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Đổi mật khẩu khách hàng</h4>
                <Link to="/customers" className="btn btn-secondary">
                    <i className="bi bi-arrow-left me-2"></i> Quay lại
                </Link>
            </div>

            {/* Form đổi mật khẩu khách hàng */}
            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <div className="alert alert-info py-2">Đang thao tác khách hàng ID: <strong>#{id}</strong></div>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Mật khẩu mới</label>
                            <input type="password" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Xác nhận mật khẩu mới</label>
                            <input type="password" className="form-control" />
                        </div>
                        <div className="text-end">
                            <Link to="/customers" className="btn btn-secondary me-2">Hủy</Link>
                            <button className="btn btn-warning" type="submit">Cập nhật mật khẩu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
