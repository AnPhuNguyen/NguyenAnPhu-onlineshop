// src/components/common/Sidebar.jsx
import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Cấu hình nhóm menu theo đúng thứ tự thiết kế gốc.
const MENU_GROUPS = [
    {
        key: 'data',
        label: 'Quản lý dữ liệu',
        icon: 'bi bi-archive',
        children: [
            { path: '/suppliers', icon: 'bi bi-truck', label: 'Nhà cung cấp' },
            { path: '/customers', icon: 'bi bi-people', label: 'Khách hàng' },
            { path: '/shippers', icon: 'bi bi-bicycle', label: 'Người giao hàng' },
            { path: '/employees', icon: 'bi bi-people-fill', label: 'Nhân viên' },
        ],
    },
    {
        key: 'catalog',
        label: 'Quản lý hàng hóa',
        icon: 'bi bi-archive',
        children: [
            { path: '/categories', icon: 'bi bi-collection', label: 'Loại hàng' },
            { path: '/products', icon: 'bi bi-boxes', label: 'Mặt hàng' },
        ],
    },
    {
        key: 'sales',
        label: 'Quản lý bán hàng',
        icon: 'bi bi-cash-stack',
        children: [
            { path: '/orders/create', icon: 'bi bi-cart-plus', label: 'Lập đơn hàng' },
            { path: '/orders', icon: 'bi bi-receipt', label: 'Quản lý đơn hàng' },
        ],
    },
];

export default function Sidebar({ isOpen, isMobile, onClose }) {
    const location = useLocation();
    const [expandedGroups, setExpandedGroups] = useState({
        data: true,
        catalog: true,
        sales: true,
    });

    // Xác định class active cho item con theo pathname hiện tại.
    const isPathActive = useMemo(
        () => (path) => location.pathname === path || location.pathname.startsWith(`${path}/`),
        [location.pathname],
    );

    // Toggle mở/đóng nhóm menu.
    const toggleGroup = (groupKey) => {
        setExpandedGroups((prev) => ({ ...prev, [groupKey]: !prev[groupKey] }));
    };

    // Khi click link, đóng sidebar trên mobile để trả lại không gian nội dung.
    const handleLinkClick = () => {
        if (isMobile) {
            onClose();
        }
    };

    return (
        <aside className={`app-sidebar shadow ${isOpen ? 'is-open' : 'is-closed'} ${isMobile ? 'is-mobile' : 'is-desktop'}`}>
            <Link to="/" className="brand-link">
                <i className="bi bi-shop me-2"></i> LiteCommerce
            </Link>
            <div className="sidebar px-2 pb-3">
                <nav className="mt-3">
                    <ul className="nav nav-pills nav-sidebar flex-column" role="menu">
                        {/* Mục cấp 1: Trang chủ */}
                        <li className="nav-item">
                            <Link to="/" className={`nav-link d-flex align-items-center ${isPathActive('/') ? 'active' : ''}`} onClick={handleLinkClick}>
                                <i className="nav-icon bi bi-speedometer2"></i>
                                <p className="mb-0 ms-2">Trang chủ</p>
                            </Link>
                        </li>

                        {/* Các nhóm menu có dropdown */}
                        {MENU_GROUPS.map((group) => (
                            <li className="nav-item" key={group.key}>
                                <button
                                    type="button"
                                    className="nav-link nav-link-group d-flex align-items-center justify-content-between w-100 border-0"
                                    onClick={() => toggleGroup(group.key)}
                                >
                                    <span className="d-flex align-items-center">
                                        <i className={`nav-icon ${group.icon}`}></i>
                                        <span className="mb-0 ms-2">{group.label}</span>
                                    </span>
                                    <i className={`bi bi-chevron-right nav-arrow ${expandedGroups[group.key] ? 'expanded' : ''}`}></i>
                                </button>
                                <ul className={`nav nav-treeview ${expandedGroups[group.key] ? 'd-block' : 'd-none'}`}>
                                    {group.children.map((child) => (
                                        <li className="nav-item" key={child.path}>
                                            <Link
                                                to={child.path}
                                                className={`nav-link d-flex align-items-center ${isPathActive(child.path) ? 'active' : ''}`}
                                                onClick={handleLinkClick}
                                            >
                                                <i className={`nav-icon ${child.icon}`}></i>
                                                <p className="mb-0 ms-2">{child.label}</p>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
