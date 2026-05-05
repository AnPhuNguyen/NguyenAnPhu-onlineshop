// src/layouts/AdminLayout.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import { logout } from '../auth';

export default function AdminLayout() {
    const navigate = useNavigate();
    // Breakpoint sidebar: < lg xem như mobile drawer.
    const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
    // Trạng thái mở/đóng sidebar.
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 992);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 992;
            setIsMobile(mobile);
            setIsSidebarOpen(!mobile);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Toggle sidebar từ nút hamburger trên header.
    const handleToggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    // Đóng sidebar theo hành vi click backdrop/click link.
    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
    };

    // Đăng xuất và đưa về màn hình login.
    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    return (
        <div className="app-wrapper">
            <Header onToggleSidebar={handleToggleSidebar} onLogout={handleLogout} />
            <Sidebar isOpen={isSidebarOpen} isMobile={isMobile} onClose={handleCloseSidebar} />

            {/* Backdrop cho chế độ mobile drawer */}
            {isMobile && isSidebarOpen && (
                <div className="app-sidebar-backdrop" onClick={handleCloseSidebar} aria-hidden="true"></div>
            )}

            {/* Vùng nội dung chính, không reload khi đóng sidebar */}
            <main className={`app-main ${!isMobile && !isSidebarOpen ? 'sidebar-collapsed' : ''}`}>
                <Outlet />
            </main>
            <footer className={`bg-white border-top p-3 text-center text-muted app-footer ${!isMobile && !isSidebarOpen ? 'sidebar-collapsed' : ''}`}>
                <small>&copy; 2024 LiteCommerce Admin. All rights reserved.</small>
            </footer>
        </div>
    );
}
