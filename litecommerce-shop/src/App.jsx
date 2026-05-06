// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Auth pages (no layout)
import Login from './pages/Account/Login';
import Register from './pages/Account/Register';
import ChangePassword from './pages/Account/ChangePassword';

// Shop pages (with layout)
import ProductList from './pages/Product/ProductList';
import ProductDetail from './pages/Product/ProductDetail';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Cart/Checkout';
import OrderList from './pages/Order/OrderList';
import OrderDetail from './pages/Order/OrderDetail';
import Profile from './pages/Account/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes - no layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* Main app routes - with layout */}
        <Route element={<MainLayout />}>
          <Route index element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/detail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/detail/:id" element={<OrderDetail />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
