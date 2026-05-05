// src/pages/Employee/EmployeeChangeRole.jsx
import { Link, useParams } from 'react-router-dom';

export default function EmployeeChangeRole() {
    const { id } = useParams();

    return (
        <div>
            {/* Toolbar trang đổi quyền */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Đổi quyền nhân viên</h4>
                <Link to="/employees" className="btn btn-secondary">
                    <i className="bi bi-arrow-left me-2"></i> Quay lại
                </Link>
            </div>

            {/* Form thay đổi role cho nhân viên */}
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <div className="alert alert-info py-2">
                        Đang thao tác cho nhân viên ID: <strong>#{id}</strong>
                    </div>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">RoleNames</label>
                            <select className="form-select">
                                <option value="employee">employee</option>
                                <option value="employee,admin">employee,admin</option>
                            </select>
                        </div>
                        <div className="text-end mt-4">
                            <Link to="/employees" className="btn btn-secondary me-2">Hủy</Link>
                            <button type="submit" className="btn btn-primary">
                                <i className="bi bi-shield-check me-2"></i> Cập nhật quyền
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
