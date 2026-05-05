// src/pages/Shipper/ShipperEdit.jsx
import { useParams, Link } from 'react-router-dom';

export default function ShipperEdit() {
    const { id } = useParams();
    const isEditing = id !== 'create' && id != null;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">{isEditing ? 'Cập nhật người giao hàng' : 'Bổ sung người giao hàng'}</h4>
                <Link to="/shippers" className="btn btn-secondary"><i className="bi bi-arrow-left me-2"></i> Quay lại</Link>
            </div>
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Tên người giao hàng</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Điện thoại</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="text-end mt-4">
                            <Link to="/shippers" className="btn btn-secondary me-2">Hủy</Link>
                            <button type="submit" className="btn btn-primary"><i className="bi bi-save me-2"></i> Lưu dữ liệu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
