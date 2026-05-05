// src/pages/Employee/EmployeeEdit.jsx
import { useParams, Link } from 'react-router-dom';

export default function EmployeeEdit() {
    const { id } = useParams();
    const isEditing = id !== 'create' && id != null;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">{isEditing ? 'Cập nhật nhân viên' : 'Bổ sung nhân viên'}</h4>
                <Link to="/employees" className="btn btn-secondary"><i className="bi bi-arrow-left me-2"></i> Quay lại</Link>
            </div>
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Tên nhân viên</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Ngày sinh (DATETIME Selector)</label>
                            <input type="date" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="isWorking" defaultChecked />
                                <label className="form-check-label" htmlFor="isWorking">Đang làm việc</label>
                            </div>
                        </div>
                        <div className="text-end mt-4">
                            <Link to="/employees" className="btn btn-secondary me-2">Hủy</Link>
                            <button type="submit" className="btn btn-primary"><i className="bi bi-save me-2"></i> Lưu dữ liệu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
