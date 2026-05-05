import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';

import ProductList from './pages/Product/ProductList';
import ProductEdit from './pages/Product/ProductEdit';

import OrderList from './pages/Order/OrderList';
import OrderDetail from './pages/Order/OrderDetail';

import CategoryList from './pages/Category/CategoryList';
import CategoryEdit from './pages/Category/CategoryEdit';

import SupplierList from './pages/Supplier/SupplierList';
import SupplierEdit from './pages/Supplier/SupplierEdit';

import ShipperList from './pages/Shipper/ShipperList';
import ShipperEdit from './pages/Shipper/ShipperEdit';

import CustomerList from './pages/Customer/CustomerList';
import CustomerEdit from './pages/Customer/CustomerEdit';

import EmployeeList from './pages/Employee/EmployeeList';
import EmployeeEdit from './pages/Employee/EmployeeEdit';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="products" element={<ProductList />} />
          <Route path="products/create" element={<ProductEdit />} />
          <Route path="products/edit/:id" element={<ProductEdit />} />

          <Route path="orders" element={<OrderList />} />
          <Route path="orders/detail/:id" element={<OrderDetail />} />

          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/create" element={<CategoryEdit />} />
          <Route path="categories/edit/:id" element={<CategoryEdit />} />

          <Route path="suppliers" element={<SupplierList />} />
          <Route path="suppliers/create" element={<SupplierEdit />} />
          <Route path="suppliers/edit/:id" element={<SupplierEdit />} />

          <Route path="shippers" element={<ShipperList />} />
          <Route path="shippers/create" element={<ShipperEdit />} />
          <Route path="shippers/edit/:id" element={<ShipperEdit />} />

          <Route path="customers" element={<CustomerList />} />
          <Route path="customers/create" element={<CustomerEdit />} />
          <Route path="customers/edit/:id" element={<CustomerEdit />} />

          <Route path="employees" element={<EmployeeList />} />
          <Route path="employees/create" element={<EmployeeEdit />} />
          <Route path="employees/edit/:id" element={<EmployeeEdit />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
