// src/pages/Order/OrderCreate.jsx
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CUSTOMERS, PRODUCTS, PROVINCES } from '../../data/mockData';

export default function OrderCreate() {
    // Số lượng thêm vào giỏ theo từng sản phẩm.
    const [quantities, setQuantities] = useState({});
    // Giỏ hàng tạm khi lập đơn.
    const [cartItems, setCartItems] = useState([]);
    // Thông tin giao hàng.
    const [customerId, setCustomerId] = useState('');
    const [deliveryProvince, setDeliveryProvince] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');

    const cartTotal = useMemo(
        () => cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0),
        [cartItems],
    );

    // Cập nhật quantity từ cột A.
    const updateQuantity = (productId, value) => {
        const safeValue = Math.max(1, Number(value || 1));
        setQuantities((prev) => ({ ...prev, [productId]: safeValue }));
    };

    // Thêm sản phẩm vào giỏ.
    const addToCart = (product) => {
        const qty = Number(quantities[product.id] || 1);
        setCartItems((prev) => {
            const exists = prev.find((item) => item.id === product.id);
            if (!exists) {
                return [...prev, { ...product, quantity: qty }];
            }
            return prev.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + qty } : item,
            );
        });
    };

    // Đổi số lượng trong giỏ.
    const updateCartItem = (productId, value) => {
        const qty = Math.max(1, Number(value || 1));
        setCartItems((prev) =>
            prev.map((item) => (item.id === productId ? { ...item, quantity: qty } : item)),
        );
    };

    // Xóa item khỏi giỏ.
    const removeCartItem = (productId) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId));
    };

    // Lập đơn hàng với thông tin giỏ + giao hàng.
    const handleCreateOrder = () => {
        if (!customerId || !deliveryProvince || !deliveryAddress.trim()) {
            alert('Vui lòng chọn khách hàng, tỉnh giao hàng và nhập địa chỉ giao hàng.');
            return;
        }
        if (!cartItems.length) {
            alert('Giỏ hàng đang trống, chưa thể lập đơn.');
            return;
        }

        alert('Đã mô phỏng lập đơn hàng thành công.');
    };

    return (
        <div>
            {/* Toolbar trang lập đơn hàng */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Lập đơn hàng</h4>
                <Link to="/orders" className="btn btn-secondary">
                    <i className="bi bi-arrow-left me-2"></i> Quay lại danh sách
                </Link>
            </div>

            {/* Layout 2 cột: A (1/3) và B (2/3) */}
            <div className="row g-3">
                {/* Cột A - danh sách mặt hàng có thể bán */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white fw-bold">Mặt hàng có thể bán</div>
                        <div className="card-body p-0" style={{ maxHeight: '72vh', overflowY: 'auto' }}>
                            {PRODUCTS.map((item) => (
                                <div key={item.id} className="border-bottom p-2">
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="bg-light rounded d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 48, height: 48 }}>
                                            <i className="bi bi-box text-muted"></i>
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="fw-bold small">{item.name}</div>
                                            <div className="text-primary small">{item.price.toLocaleString('vi-VN')}₫</div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-2 mt-2">
                                        <input
                                            type="number"
                                            min={1}
                                            className="form-control form-control-sm"
                                            value={quantities[item.id] || 1}
                                            onChange={(event) => updateQuantity(item.id, event.target.value)}
                                        />
                                        <button type="button" className="btn btn-sm btn-outline-primary text-nowrap" onClick={() => addToCart(item)}>
                                            Thêm
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Cột B - giỏ hàng + thông tin giao hàng */}
                <div className="col-lg-8">
                    {/* Dòng trên: giỏ hàng */}
                    <div className="card border-0 shadow-sm mb-3">
                        <div className="card-header bg-white fw-bold">Giỏ hàng đơn hàng</div>
                        <div className="card-body p-0 table-responsive">
                            <table className="table table-sm table-hover table-bordered mb-0 align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th className="text-end" style={{ width: '140px' }}>Đơn giá</th>
                                        <th className="text-center" style={{ width: '120px' }}>Số lượng</th>
                                        <th className="text-end" style={{ width: '160px' }}>Thành tiền</th>
                                        <th className="text-center" style={{ width: '70px' }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.id}>
                                            <td className="fw-bold">{item.name}</td>
                                            <td className="text-end">{item.price.toLocaleString('vi-VN')}₫</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    className="form-control form-control-sm"
                                                    value={item.quantity}
                                                    onChange={(event) => updateCartItem(item.id, event.target.value)}
                                                />
                                            </td>
                                            <td className="text-end fw-bold">{(item.quantity * item.price).toLocaleString('vi-VN')}₫</td>
                                            <td className="text-center">
                                                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeCartItem(item.id)}>
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {!cartItems.length && (
                                        <tr>
                                            <td colSpan={5} className="text-center py-3 text-muted">Giỏ hàng đang trống.</td>
                                        </tr>
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={3} className="text-end fw-bold">Tổng cộng</td>
                                        <td className="text-end fw-bold text-primary">{cartTotal.toLocaleString('vi-VN')}₫</td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    {/* Dòng dưới: thông tin khách hàng + giao hàng */}
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white fw-bold">Thông tin khách hàng và nơi giao hàng</div>
                        <div className="card-body">
                            <div className="row g-3">
                                <div className="col-md-4">
                                    <label className="form-label">Khách hàng</label>
                                    <select className="form-select" value={customerId} onChange={(event) => setCustomerId(event.target.value)}>
                                        <option value="">-- Chọn khách hàng --</option>
                                        {CUSTOMERS.map((item) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Tỉnh/thành giao hàng</label>
                                    <select className="form-select" value={deliveryProvince} onChange={(event) => setDeliveryProvince(event.target.value)}>
                                        <option value="">-- Chọn tỉnh/thành --</option>
                                        {PROVINCES.map((item) => (
                                            <option key={item.name} value={item.name}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Địa chỉ giao hàng</label>
                                    <input className="form-control" type="text" value={deliveryAddress} onChange={(event) => setDeliveryAddress(event.target.value)} />
                                </div>
                            </div>
                            <div className="text-end mt-3">
                                <button type="button" className="btn btn-primary" onClick={handleCreateOrder}>
                                    <i className="bi bi-cart-check me-2"></i> Lập đơn hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
