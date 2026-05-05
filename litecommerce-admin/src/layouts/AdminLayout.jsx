// src/layouts/AdminLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

export default function AdminLayout() {
    return (
        <div className="app-wrapper">
            <Header />
            <Sidebar />
            <main className="app-main">
                <Outlet />
            </main>
            <footer className="bg-white border-top p-3 ms-[250px] text-center text-muted" style={{ marginLeft: '250px' }}>
                <small>&copy; 2024 LiteCommerce Admin. All rights reserved.</small>
            </footer>
        </div>
    );
}
