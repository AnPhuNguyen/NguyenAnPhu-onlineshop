// src/pages/Product/ProductAttributeList.jsx
import { Link, useParams } from 'react-router-dom';
import { PRODUCT_ATTRIBUTES } from '../../data/mockData';

export default function ProductAttributeList() {
    const { id } = useParams();
    const attributes = PRODUCT_ATTRIBUTES.filter((item) => String(item.productId) === String(id));

    return (
        <div>
            {/* Toolbar danh sách thuộc tính sản phẩm */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Thuộc tính của mặt hàng #{id}</h4>
                <div>
                    <Link to={`/products/attributes/${id}/create`} className="btn btn-primary me-2">
                        <i className="bi bi-plus-circle me-2"></i> Thêm thuộc tính
                    </Link>
                    <Link to="/products" className="btn btn-secondary">
                        <i className="bi bi-arrow-left me-2"></i> Quay lại
                    </Link>
                </div>
            </div>

            {/* Bảng thuộc tính */}
            <div className="card border-0 shadow-sm">
                <div className="card-body p-0 table-responsive">
                    <table className="table table-hover table-bordered mb-0 align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Tên thuộc tính</th>
                                <th>Giá trị</th>
                                <th className="text-center" style={{ width: '120px' }}>Thứ tự</th>
                                <th className="text-center" style={{ width: '160px' }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attributes.map((item) => (
                                <tr key={item.attributeId}>
                                    <td className="fw-bold">{item.attributeName}</td>
                                    <td>{item.attributeValue}</td>
                                    <td className="text-center">{item.displayOrder}</td>
                                    <td className="text-center text-nowrap">
                                        <Link to={`/products/attributes/${id}/edit/${item.attributeId}`} className="btn btn-sm btn-outline-primary me-1">
                                            <i className="bi bi-pencil"></i>
                                        </Link>
                                        <Link to={`/products/attributes/${id}/delete/${item.attributeId}`} className="btn btn-sm btn-outline-danger">
                                            <i className="bi bi-trash"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {attributes.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-4 text-muted">Chưa có thuộc tính nào.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
