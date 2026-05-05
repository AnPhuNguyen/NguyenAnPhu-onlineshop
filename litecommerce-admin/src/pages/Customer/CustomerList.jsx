// src/pages/Customer/CustomerList.jsx
import { Link } from 'react-router-dom';
import { CUSTOMERS } from '../../data/mockData';

export default function CustomerList() {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Khách hàng</h4>
                <Link to="/customers/create" className="btn btn-primary"><i className="bi bi-plus-circle me-2"></i> Bổ sung</Link>
            </div>
            <div className="card shadow-sm border-0">
                <div className="card-body p-0 table-responsive">
                    <table className="table table-hover table-bordered mb-0 align-middle">
                        <thead className="table-light text-secondary">
                            <tr>
                                <th>Tên khách hàng</th>
                                <th>Tỉnh/Thành</th>
                                <th>Điện thoại</th>
                                <th>Email</th>
                                <th className="text-center">Trạng thái khóa</th>
                                <th className="text-center" style={{ width: '120px' }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CUSTOMERS.map(i => (
                                <tr key={i.id}>
                                    <td className="fw-bold">{i.name}</td>
                                    <td>{i.province}</td>
                                    <td>{i.phone}</td>
                                    <td>{i.email}</td>
                                    <td className="text-center">
                                        {i.isLocked ? <span className="badge bg-danger">Khóa</span> : <span className="badge bg-success">Hoạt động</span>}
                                    </td>
                                    <td className="text-center">
                                        <Link to={`/customers/edit/${i.id}`} className="btn btn-sm btn-outline-primary me-1"><i className="bi bi-pencil"></i></Link>
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
