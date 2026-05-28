# LiteCommerce (Shop + Admin + Backend) — README (Tiếng Việt)

Đây là một monorepo cho hệ thống **LiteCommerce** gồm 3 phần chính:

- **Shop frontend (Customer)**: `litecommerce-shop/` (React + Vite)
- **Admin frontend (Employee/Admin)**: `litecommerce-admin/` (React + Vite)
- **Backend API**: `litecommerce-backend/` (NestJS)

Xem thêm:
- `Introduce.md` để có cái nhìn tổng quan repo
- `CONTEXT-MAP.md` và mỗi thư mục con `CONTEXT.md` để hiểu context theo từng phần
- `resources/guide.txt` để nắm yêu cầu chức năng & luồng người dùng
- `resources/db_diagram.txt` để tham chiếu cấu trúc database
- `resources/orderstatus.txt`, `resources/provinces.txt` (dữ liệu tra cứu)

---

## Đã đạt được gì cho đến hiện tại?

### Shop frontend (điểm nổi bật từ session 2026-05-28)
Theo `resources/agent_session_done/2026-05-28_shop-frontend-adjustments_summary.md`, Shop đã được cải thiện UI/UX ở các điểm chính:

- **Cart (/cart)**
  - Sửa layout để điều khiển **thay đổi số lượng** vẫn hoạt động tốt trên màn hình nhỏ
  - Giúp tên sản phẩm không làm “đẩy” các khu vực khác ra khỏi khung giao diện
  - File liên quan: `litecommerce-shop/src/pages/Cart/Cart.jsx`

- **Profile → Đổi mật khẩu (inline thay vì điều hướng)**
  - “Đổi mật khẩu” được hiển thị **inline** bên trong trang Profile thay vì điều hướng qua route khác
  - File liên quan:
    - `litecommerce-shop/src/pages/Account/Profile.jsx`
    - `litecommerce-shop/src/pages/Account/ChangePasswordInline.jsx`

- **Thành phần mới**
  - `litecommerce-shop/src/pages/Account/ChangePasswordInline.jsx`

---

## Thiết lập & chạy dự án

### 0) Yêu cầu
- **Node.js** (cho Shop/Admin)
- **MySQL/MariaDB** (cho Backend)
- **Trình duyệt** để chạy Shop/Admin

### 1) Import database (bắt buộc trước khi chạy Backend)
Repo có sẵn dump:
- `litecommercedb.sql`

Chạy theo các bước:
1. Khởi động MySQL/MariaDB
2. Import dump:

```bash
# Ví dụ (chỉnh user/host/port theo môi trường của bạn):
mysql -u <user> -p < litecommercedb.sql
```

> Ghi chú: dump đã được chuẩn bị để “an toàn” hơn khi database chưa tồn tại (`CREATE DATABASE IF NOT EXISTS` + `USE ...` có trong nội dung dump).

### 2) Chạy Backend (NestJS)
Từ thư mục repo root:

```bash
cd litecommerce-backend
npm install
npm run start
```

### 3) Chạy Shop frontend (React/Vite)
```bash
cd litecommerce-shop
npm install
npm run dev
```

### 4) Chạy Admin frontend (tuỳ chọn)
```bash
cd litecommerce-admin
npm install
npm run dev
```

---

## Ghi chú về file bị loại khỏi version control
Repo có một số file/thư mục (thường là file generate, cache, hoặc nội dung tạm thời) không được commit. README này tập trung vào các bước run theo đúng cấu trúc chính: `litecommerce-shop/`, `litecommerce-admin/`, `litecommerce-backend/` và database dump ở root.

---
