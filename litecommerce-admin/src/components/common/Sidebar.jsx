// src/components/common/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';

const MENU_ITEMS = [
    { path: '/', icon: 'bi-speedometer2', label: 'Bảng điều khiển' },
    { path: '/products', icon: 'bi-box-seam', label: 'Quản lý Mặt hàng' },
    { path: '/orders', icon: 'bi-cart-check', label: 'Quản lý Đơn hàng' },
    { path: '/categories', icon: 'bi-tags', label: 'Loại hàng' },
    { path: '/suppliers', icon: 'bi-truck', label: 'Nhà cung cấp' },
    { path: '/customers', icon: 'bi-people', label: 'Khách hàng' },
];

export default function Sidebar() {
    const location = useLocation();

    return (
        <aside className="app-sidebar shadow">
            <Link to="/" className="brand-link">
                <i className="bi bi-shop me-2"></i> LiteCommerce
            </Link>
            <div className="sidebar px-2 pb-3">
                <nav className="mt-3">
                    <ul className="nav nav-pills nav-sidebar flex-column" role="menu">
                        {MENU_ITEMS.map((item) => (
                            <li className="nav-item" key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`nav-link d-flex align-items-center ${location.pathname === item.path ? 'active' : ''
                                        }`}
                                >
                                    <i className={`nav-icon ${item.icon}`}></i>
                                    <p className="mb-0 ms-2">{item.label}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
