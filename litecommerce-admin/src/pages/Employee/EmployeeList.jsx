// src/pages/Employee/EmployeeList.jsx
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { EMPLOYEES } from '../../data/mockData';
import usePagination from '../../hooks/usePagination';
import PaginationControls from '../../components/common/PaginationControls';

export default function EmployeeList() {
    // Bộ lọc theo role và trạng thái làm việc.
    const [roleFilter, setRoleFilter] = useState('');
    const [workingFilter, setWorkingFilter] = useState('');
    // Search theo tên nhân viên.
    const [searchInput, setSearchInput] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');

    // Danh sách nhân viên sau khi filter + search.
    const filteredEmployees = useMemo(() => {
        const keyword = searchKeyword.trim().toLowerCase();
        return EMPLOYEES.filter((item) => {
            const matchedRole = !roleFilter || item.roles === roleFilter;
            const matchedWorking =
                !workingFilter ||
                (workingFilter === 'working' ? item.isWorking : !item.isWorking);
            const matchedName = !keyword || item.name.toLowerCase().includes(keyword);
            return matchedRole && matchedWorking && matchedName;
        });
    }, [roleFilter, workingFilter, searchKeyword]);
    const { currentPage, totalPages, pageItems, setCurrentPage } = usePagination(filteredEmployees, 10);

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchKeyword(searchInput);
    };

    return (
        <div>
            {/* Toolbar danh sách nhân viên */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Nhân viên</h4>
                <Link to="/employees/create" className="btn btn-primary"><i className="bi bi-plus-circle me-2"></i> Bổ sung</Link>
            </div>

            {/* Khu vực filter + search nhân viên */}
            <div className="card mb-3 shadow-sm border-0">
                <div className="card-body">
                    <form className="row g-2" onSubmit={handleSearch}>
                        <div className="col-md-3">
                            <label className="form-label text-muted small fw-bold">Quyền / Role</label>
                            <select className="form-select" value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
                                <option value="">-- Tất cả --</option>
                                <option value="employee">employee</option>
                                <option value="employee,admin">employee,admin</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label text-muted small fw-bold">Trạng thái làm việc</label>
                            <select className="form-select" value={workingFilter} onChange={(event) => setWorkingFilter(event.target.value)}>
                                <option value="">-- Tất cả --</option>
                                <option value="working">Đang làm việc</option>
                                <option value="inactive">Đã nghỉ</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label text-muted small fw-bold">Tìm theo tên nhân viên</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nhập tên nhân viên..."
                                    value={searchInput}
                                    onChange={(event) => setSearchInput(event.target.value)}
                                />
                                <button className="btn btn-info text-white" type="submit">
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Bảng dữ liệu nhân viên */}
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
                            {pageItems.map(i => (
                                <tr key={i.id}>
                                    <td className="fw-bold">{i.name}</td>
                                    <td>{i.birthDate}</td>
                                    <td>{i.phone}</td>
                                    <td>{i.email}</td>
                                    <td><span className="badge bg-secondary">{i.roles}</span></td>
                                    <td className="text-center">
                                        {i.isWorking ? <span className="badge bg-success">Có</span> : <span className="badge bg-danger">Nghỉ</span>}
                                    </td>
                                    <td className="text-center text-nowrap">
                                        {/* Nhóm thao tác nhanh cho từng nhân viên */}
                                        <Link to={`/employees/edit/${i.id}`} className="btn btn-sm btn-outline-primary me-1"><i className="bi bi-pencil"></i></Link>
                                        <Link to={`/employees/change-password/${i.id}`} className="btn btn-sm btn-outline-warning me-1" title="Đổi mật khẩu">
                                            <i className="bi bi-key"></i>
                                        </Link>
                                        <Link to={`/employees/change-role/${i.id}`} className="btn btn-sm btn-outline-info me-1" title="Đổi quyền">
                                            <i className="bi bi-shield-lock"></i>
                                        </Link>
                                        <Link to={`/employees/delete/${i.id}`} className="btn btn-sm btn-outline-danger" title="Xóa">
                                            <i className="bi bi-trash"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {pageItems.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="text-center py-4 text-muted">Không có nhân viên phù hợp.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <PaginationControls currentPage={currentPage} totalPages={totalPages} onChangePage={setCurrentPage} />
            </div>
        </div>
    );
}
