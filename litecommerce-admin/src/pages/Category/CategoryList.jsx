// src/pages/Category/CategoryList.jsx
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/mockData';

export default function CategoryList() {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Loại hàng</h4>
                <Link to="/categories/create" className="btn btn-primary d-flex align-items-center">
                    <i className="bi bi-plus-circle me-2"></i> Bổ sung
                </Link>
            </div>
            <div className="card shadow-sm border-0">
                <div className="card-body p-0 table-responsive">
                    <table className="table table-hover table-bordered mb-0 align-middle">
                        <thead className="table-light text-secondary">
                            <tr>
                                <th>Loại hàng</th>
                                <th className="text-center" style={{ width: '120px' }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CATEGORIES.map(i => (
                                <tr key={i.id}>
                                    <td className="fw-bold">{i.name}</td>
                                    <td className="text-center">
                                        <Link to={`/categories/edit/${i.id}`} className="btn btn-sm btn-outline-primary me-1"><i className="bi bi-pencil"></i></Link>
                                        <button className="btn btn-sm btn-outline-danger"><i className="bi bi-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
