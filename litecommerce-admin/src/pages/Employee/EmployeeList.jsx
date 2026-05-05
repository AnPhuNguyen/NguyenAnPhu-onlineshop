// src/pages/Employee/EmployeeList.jsx
import { Link } from 'react-router-dom';
import { EMPLOYEES } from '../../data/mockData';

export default function EmployeeList() {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Nhân viên</h4>
                <Link to="/employees/create" className="btn btn-primary"><i className="bi bi-plus-circle me-2"></i> Bổ sung</Link>
            </div>
            <div className="card shadow-sm border-0">
                <div className="card-body p-0 table-responsive">
                    <table className="table table-hover table-bordered mb-0 align-middle">
                        <thead className="table-light text-secondary">
                            <tr>
                                <th>Họ tên</th>
                                <th>Ngày sinh</th>
                                <th>Điện thoại</th>
                                <th>Email</th>
                                <th>Chức vụ (Roles)</th>
                                <th className="text-center">Đang làm việc</th>
                                <th className="text-center" style={{ width: '120px' }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {EMPLOYEES.map(i => (
                                <tr key={i.id}>
                                    <td className="fw-bold">{i.name}</td>
                                    <td>{i.birthDate}</td>
                                    <td>{i.phone}</td>
                                    <td>{i.email}</td>
                                    <td><span className="badge bg-secondary">{i.roles}</span></td>
                                    <td className="text-center">
                                        {i.isWorking ? <span className="badge bg-success">Có</span> : <span className="badge bg-danger">Nghỉ</span>}
                                    </td>
                                    <td className="text-center">
                                        <Link to={`/employees/edit/${i.id}`} className="btn btn-sm btn-outline-primary me-1"><i className="bi bi-pencil"></i></Link>
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
