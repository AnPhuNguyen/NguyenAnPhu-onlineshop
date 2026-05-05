// src/pages/Customer/CustomerEdit.jsx
import { useParams, Link } from 'react-router-dom';
import { PROVINCES } from '../../data/mockData';

export default function CustomerEdit() {
    const { id } = useParams();
    const isEditing = id !== 'create' && id != null;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">{isEditing ? 'Cập nhật khách hàng' : 'Bổ sung khách hàng'}</h4>
                <Link to="/customers" className="btn btn-secondary"><i className="bi bi-arrow-left me-2"></i> Quay lại</Link>
            </div>
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Tên khách hàng</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tỉnh thành</label>
                            <select className="form-select">
                                <option value="">-- Chọn tỉnh thành --</option>
                                {PROVINCES.map((p, ix) => <option key={ix} value={p.name}>{p.name}</option>)}
                            </select>
                        </div>
                        <div className="mb-3">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="isLocked" />
                                <label className="form-check-label" htmlFor="isLocked">Trạng thái khóa tài khoản</label>
                            </div>
                        </div>
                        <div className="text-end mt-4">
                            <Link to="/customers" className="btn btn-secondary me-2">Hủy</Link>
                            <button type="submit" className="btn btn-primary"><i className="bi bi-save me-2"></i> Lưu dữ liệu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
