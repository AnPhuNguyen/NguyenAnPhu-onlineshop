import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getCurrentAuth, isAdmin } from './auth';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Account/Login';
import AccessDenied from './pages/Account/AccessDenied';

import ProductList from './pages/Product/ProductList';
import ProductEdit from './pages/Product/ProductEdit';
import ProductDelete from './pages/Product/ProductDelete';
import ProductAttributeList from './pages/Product/ProductAttributeList';
import ProductAttributeEdit from './pages/Product/ProductAttributeEdit';
import ProductAttributeDelete from './pages/Product/ProductAttributeDelete';
import ProductPhotoList from './pages/Product/ProductPhotoList';
import ProductPhotoEdit from './pages/Product/ProductPhotoEdit';

import OrderList from './pages/Order/OrderList';
import OrderDetail from './pages/Order/OrderDetail';
import OrderCreate from './pages/Order/OrderCreate';
import OrderAccept from './pages/Order/OrderAccept';
import OrderReject from './pages/Order/OrderReject';
import OrderShipping from './pages/Order/OrderShipping';
import OrderFinish from './pages/Order/OrderFinish';
import OrderCancel from './pages/Order/OrderCancel';
import OrderDelete from './pages/Order/OrderDelete';

import CategoryList from './pages/Category/CategoryList';
import CategoryEdit from './pages/Category/CategoryEdit';
import CategoryDelete from './pages/Category/CategoryDelete';

import SupplierList from './pages/Supplier/SupplierList';
import SupplierEdit from './pages/Supplier/SupplierEdit';
import SupplierDelete from './pages/Supplier/SupplierDelete';

import ShipperList from './pages/Shipper/ShipperList';
import ShipperEdit from './pages/Shipper/ShipperEdit';
import ShipperDelete from './pages/Shipper/ShipperDelete';

import CustomerList from './pages/Customer/CustomerList';
import CustomerEdit from './pages/Customer/CustomerEdit';
import CustomerDelete from './pages/Customer/CustomerDelete';
import CustomerChangePassword from './pages/Customer/CustomerChangePassword';

import EmployeeList from './pages/Employee/EmployeeList';
import EmployeeEdit from './pages/Employee/EmployeeEdit';
import EmployeeCreate from './pages/Employee/EmployeeCreate';
import EmployeeDelete from './pages/Employee/EmployeeDelete';
import EmployeeChangePassword from './pages/Employee/EmployeeChangePassword';
import EmployeeChangeRole from './pages/Employee/EmployeeChangeRole';

function RequireAuth({ children }) {
  const auth = getCurrentAuth();
  return auth ? children : <Navigate to="/login" replace />;
}

function RequireAdmin({ children }) {
  const auth = getCurrentAuth();
  if (!auth) return <Navigate to="/login" replace />;
  return isAdmin() ? children : <Navigate to="/access-denied" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/access-denied" element={<AccessDenied />} />

        <Route path="/" element={<RequireAuth><AdminLayout /></RequireAuth>}>
          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Product routes */}
          <Route path="products" element={<ProductList />} />
          <Route path="products/create" element={<ProductEdit />} />
          <Route path="products/edit/:id" element={<ProductEdit />} />
          <Route path="products/delete/:id" element={<ProductDelete />} />
          <Route path="products/attributes/:id" element={<ProductAttributeList />} />
          <Route path="products/attributes/:id/create" element={<ProductAttributeEdit />} />
          <Route path="products/attributes/:id/edit/:attributeId" element={<ProductAttributeEdit />} />
          <Route path="products/attributes/:id/delete/:attributeId" element={<ProductAttributeDelete />} />
          <Route path="products/photos/:id" element={<ProductPhotoList />} />
          <Route path="products/photos/:id/create" element={<ProductPhotoEdit />} />
          <Route path="products/photos/:id/edit/:photoId" element={<ProductPhotoEdit />} />

          {/* Order routes */}
          <Route path="orders" element={<OrderList />} />
          <Route path="orders/create" element={<OrderCreate />} />
          <Route path="orders/detail/:id" element={<OrderDetail />} />
          <Route path="orders/accept/:id" element={<OrderAccept />} />
          <Route path="orders/reject/:id" element={<OrderReject />} />
          <Route path="orders/shipping/:id" element={<OrderShipping />} />
          <Route path="orders/finish/:id" element={<OrderFinish />} />
          <Route path="orders/cancel/:id" element={<OrderCancel />} />
          <Route path="orders/delete/:id" element={<OrderDelete />} />

          {/* Category routes */}
          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/create" element={<CategoryEdit />} />
          <Route path="categories/edit/:id" element={<CategoryEdit />} />
          <Route path="categories/delete/:id" element={<CategoryDelete />} />

          {/* Supplier routes */}
          <Route path="suppliers" element={<SupplierList />} />
          <Route path="suppliers/create" element={<SupplierEdit />} />
          <Route path="suppliers/edit/:id" element={<SupplierEdit />} />
          <Route path="suppliers/delete/:id" element={<SupplierDelete />} />

          {/* Shipper routes */}
          <Route path="shippers" element={<ShipperList />} />
          <Route path="shippers/create" element={<ShipperEdit />} />
          <Route path="shippers/edit/:id" element={<ShipperEdit />} />
          <Route path="shippers/delete/:id" element={<ShipperDelete />} />

          {/* Customer routes */}
          <Route path="customers" element={<CustomerList />} />
          <Route path="customers/create" element={<RequireAdmin><CustomerEdit /></RequireAdmin>} />
          <Route path="customers/edit/:id" element={<RequireAdmin><CustomerEdit /></RequireAdmin>} />
          <Route path="customers/delete/:id" element={<RequireAdmin><CustomerDelete /></RequireAdmin>} />
          <Route path="customers/change-password/:id" element={<RequireAdmin><CustomerChangePassword /></RequireAdmin>} />

          {/* Employee routes */}
          <Route path="employees" element={<EmployeeList />} />
          <Route path="employees/create" element={<RequireAdmin><EmployeeCreate /></RequireAdmin>} />
          <Route path="employees/edit/:id" element={<RequireAdmin><EmployeeEdit /></RequireAdmin>} />
          <Route path="employees/delete/:id" element={<RequireAdmin><EmployeeDelete /></RequireAdmin>} />
          <Route path="employees/change-password/:id" element={<EmployeeChangePassword />} />
          <Route path="employees/change-role/:id" element={<RequireAdmin><EmployeeChangeRole /></RequireAdmin>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
