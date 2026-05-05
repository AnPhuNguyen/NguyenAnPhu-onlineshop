// src/pages/Product/ProductAttributeDelete.jsx
import { Link, useParams } from 'react-router-dom';

export default function ProductAttributeDelete() {
    const { id, attributeId } = useParams();

    return (
        <div>
            {/* Trang xác nhận xóa thuộc tính */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Xóa thuộc tính mặt hàng</h4>
                <Link to={`/products/attributes/${id}`} className="btn btn-secondary">
                    <i className="bi bi-arrow-left me-2"></i> Quay lại
                </Link>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <p className="mb-2">Bạn có chắc chắn muốn xóa thuộc tính có mã:</p>
                    <h5 className="text-danger mb-3">#{attributeId}</h5>
                    <div className="text-end">
                        <Link to={`/products/attributes/${id}`} className="btn btn-secondary me-2">Hủy</Link>
                        <button className="btn btn-danger" type="button">
                            <i className="bi bi-trash me-2"></i>Xác nhận xóa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
