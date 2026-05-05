// src/pages/Account/AccessDenied.jsx
import { Link } from 'react-router-dom';

export default function AccessDenied() {
    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
            <div className="card border-0 shadow-sm w-100" style={{ maxWidth: 520 }}>
                <div className="card-body p-4 text-center">
                    <h4 className="text-danger mb-3">Truy cập bị từ chối</h4>
                    <p className="text-muted mb-4">
                        Bạn không có quyền quản trị viên để thực hiện thao tác này.
                    </p>
                    <div className="d-flex justify-content-center gap-2">
                        <Link to="/" className="btn btn-primary">Về trang chủ</Link>
                        <Link to="/login" className="btn btn-outline-secondary">Đăng nhập lại</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
