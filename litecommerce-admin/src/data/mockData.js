// src/data/mockData.js
export const CATEGORIES = [
    { id: 1, name: 'Điện thoại' },
    { id: 2, name: 'Laptop' },
    { id: 3, name: 'Linh kiện' },
];

export const SUPPLIERS = [
    { id: 1, name: 'Apple Inc.' },
    { id: 2, name: 'Samsung' },
    { id: 3, name: 'Asus' },
];

export const PRODUCTS = [
    { id: 1, name: 'iPhone 15 Pro Max', unit: 'Chiếc', price: 34990000, isSelling: true, photo: null },
    { id: 2, name: 'Samsung Galaxy S24', unit: 'Chiếc', price: 25990000, isSelling: true, photo: null },
    { id: 3, name: 'Macbook Air M2', unit: 'Chiếc', price: 27990000, isSelling: false, photo: null },
    { id: 4, name: 'Asus ROG Strix', unit: 'Chiếc', price: 38000000, isSelling: true, photo: null },
];

export const ORDERS = [
    { id: 1001, customer: 'Nguyễn Văn A', time: '14/05/2026', total: 34990000, status: 1 },
    { id: 1002, customer: 'Trần Thị B', time: '13/05/2026', total: 53980000, status: 2 },
    { id: 1003, customer: 'Lê Hoàng C', time: '11/05/2026', total: 27990000, status: 4 },
    { id: 1004, customer: 'Phạm D', time: '10/05/2026', total: 38000000, status: -1 },
];

export const STATUS_LABELS = {
    1: { text: 'Đơn hàng mới', class: 'badge bg-primary' },
    2: { text: 'Đã duyệt', class: 'badge bg-info' },
    3: { text: 'Đang giao', class: 'badge bg-warning' },
    4: { text: 'Hoàn tất', class: 'badge bg-success' },
    '-1': { text: 'Bị hủy', class: 'badge bg-danger' },
    '-2': { text: 'Bị từ chối', class: 'badge bg-danger' }
};

export const SHIPPERS = [
    { id: 1, name: 'Giao Hàng Nhanh', phone: '19001234' },
    { id: 2, name: 'Viettel Post', phone: '19008098' },
];

export const CUSTOMERS = [
    { id: 1, name: 'Nguyễn Văn A', contact: 'A Nguyễn', province: 'Hà Nội', address: '123 Cầu Giấy', phone: '0987123456', email: 'a@gmail.com', isLocked: false },
    { id: 2, name: 'Trần Thị B', contact: 'B Trần', province: 'Hồ Chí Minh', address: '456 Quận 1', phone: '0987654321', email: 'b@gmail.com', isLocked: true },
];

export const EMPLOYEES = [
    { id: 1, name: 'Quản Trị Viên', birthDate: '1990-01-01', address: 'Hà Nội', phone: '0901234567', email: 'admin@litecommerce.com', isWorking: true, roles: 'employee,admin' },
    { id: 2, name: 'Nhân viên KS', birthDate: '1995-05-05', address: 'Hồ Chí Minh', phone: '0912345678', email: 'nv@litecommerce.com', isWorking: true, roles: 'employee' },
];

export const PROVINCES = [
    { name: 'Hà Nội' }, { name: 'Hồ Chí Minh' }, { name: 'Đà Nẵng' }, { name: 'Hải Phòng' }, { name: 'Cần Thơ' }
];
