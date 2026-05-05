// src/components/common/Header.jsx
export default function Header() {
    return (
        <nav className="app-header navbar navbar-expand bg-white">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                            <i className="bi bi-list"></i>
                        </a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="/" className="nav-link">Trang chủ</a>
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
                                <a href="#" className="btn btn-default btn-flat">Đăng xuất</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
