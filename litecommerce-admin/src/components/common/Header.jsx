// src/components/common/Header.jsx
// Header dùng để hiển thị nút toggle sidebar và menu người dùng.
import { Link } from 'react-router-dom';

export default function Header({ onToggleSidebar, onLogout }) {
    return (
        <nav className="app-header navbar navbar-expand bg-white">
            <div className="container-fluid">
                <ul className="navbar-nav d-flex align-items-center">
                    <li className="nav-item d-flex align-items-center me-3">
                        {/* Nút toggle sidebar cho cả desktop/mobile */}
                        <button
                            className="nav-link btn btn-link p-0 d-flex align-items-center header-toggle-btn"
                            type="button"
                            onClick={onToggleSidebar}
                            aria-label="Toggle sidebar"
                        >
                            <i className="bi bi-list"></i>
                        </button>
                    </li>
                    {/* Link trang chủ */}
                    <li className="nav-item d-none d-sm-inline-block d-flex align-items-center">
                        <Link to="/" className="nav-link py-0">Trang chủ</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item dropdown user-menu">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <img
                                src="https://ui-avatars.com/api/?name=Admin&background=random"
                                className="user-image img-circle shadow"
                                alt="User Image"
                                style={{ width: '30px', borderRadius: '50%' }}
                            />
                            <span className="d-none d-md-inline ms-2">Admin User</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
                            <li className="user-header bg-primary text-center p-3 text-white">
                                <img
                                    src="https://ui-avatars.com/api/?name=Admin&background=random"
                                    className="img-circle shadow mb-2"
                                    alt="User Image"
                                    style={{ width: '60px', borderRadius: '50%' }}
                                />
                                <p>
                                    Admin User - Web Developer
                                    <small className="d-block mt-1">Member since Nov. 2024</small>
                                </p>
                            </li>
                            <li className="user-footer d-flex justify-content-between p-2">
                                <a href="#" className="btn btn-default btn-flat">Profile</a>
                                <button type="button" className="btn btn-default btn-flat" onClick={onLogout}>Đăng xuất</button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
