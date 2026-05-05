// src/pages/Order/OrderShipping.jsx
import { Link, useParams } from 'react-router-dom';
import { SHIPPERS } from '../../data/mockData';

export default function OrderShipping() {
    const { id } = useParams();

    return (
        <div>
            {/* Trang chuyển đơn sang vận chuyển */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Chuyển vận chuyển đơn #{id}</h4>
                <Link to={`/orders/detail/${id}`} className="btn btn-secondary">Quay lại chi tiết</Link>
            </div>
            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Chọn người giao hàng</label>
                        <select className="form-select">
                            {SHIPPERS.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="text-end">
                        <Link to={`/orders/detail/${id}`} className="btn btn-secondary me-2">Hủy</Link>
                        <button className="btn btn-primary">Xác nhận chuyển giao</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
