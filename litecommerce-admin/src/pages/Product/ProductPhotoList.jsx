// src/pages/Product/ProductPhotoList.jsx
import { Link, useParams } from 'react-router-dom';
import { PRODUCT_PHOTOS } from '../../data/mockData';

export default function ProductPhotoList() {
    const { id } = useParams();
    const photos = PRODUCT_PHOTOS.filter((item) => String(item.productId) === String(id));

    return (
        <div>
            {/* Toolbar thư viện ảnh sản phẩm */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Thư viện ảnh mặt hàng #{id}</h4>
                <div>
                    <Link to={`/products/photos/${id}/create`} className="btn btn-primary me-2">
                        <i className="bi bi-plus-circle me-2"></i> Thêm ảnh
                    </Link>
                    <Link to="/products" className="btn btn-secondary">
                        <i className="bi bi-arrow-left me-2"></i> Quay lại
                    </Link>
                </div>
            </div>

            {/* Bảng ảnh sản phẩm */}
            <div className="card border-0 shadow-sm">
                <div className="card-body p-0 table-responsive">
                    <table className="table table-hover table-bordered mb-0 align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Tên ảnh</th>
                                <th>Mô tả</th>
                                <th className="text-center">Hiển thị</th>
                                <th className="text-center">Thứ tự</th>
                                <th className="text-center" style={{ width: '120px' }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {photos.map((item) => (
                                <tr key={item.photoId}>
                                    <td className="fw-bold">{item.photo}</td>
                                    <td>{item.description}</td>
                                    <td className="text-center">{item.isHidden ? 'Ẩn' : 'Hiện'}</td>
                                    <td className="text-center">{item.displayOrder}</td>
                                    <td className="text-center">
                                        <Link to={`/products/photos/${id}/edit/${item.photoId}`} className="btn btn-sm btn-outline-primary">
                                            <i className="bi bi-pencil"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {photos.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-muted">Chưa có ảnh trong thư viện.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
