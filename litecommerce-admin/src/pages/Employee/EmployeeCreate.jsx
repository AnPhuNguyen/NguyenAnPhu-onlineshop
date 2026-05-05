// src/pages/Employee/EmployeeCreate.jsx
import { Link } from 'react-router-dom';

export default function EmployeeCreate() {
    return (
        <div>
            {/* Toolbar của trang tạo mới nhân viên */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Bổ sung nhân viên</h4>
                <Link to="/employees" className="btn btn-secondary">
                    <i className="bi bi-arrow-left me-2"></i> Quay lại
                </Link>
            </div>

            {/* Form tạo mới nhân viên */}
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <form>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Họ tên nhân viên</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Điện thoại</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Ngày sinh</label>
                                <input type="date" className="form-control" />
                            </div>
                            <div className="col-12">
                                <label className="form-label">Địa chỉ</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>

                        <div className="text-end mt-4">
                            <Link to="/employees" className="btn btn-secondary me-2">Hủy</Link>
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
