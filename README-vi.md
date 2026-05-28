# README — LiteCommerce (Monorepo) (Tiếng Việt)

## Dự án này là gì?
**LiteCommerce** là một monorepo đa dự án (multi-project monorepo) cho hệ thống bán hàng trực tuyến, gồm 3 phần chính:

- **Shop frontend** (`litecommerce-shop/`): ứng dụng React/Vite dành cho khách hàng (customer-facing)
- **Admin frontend** (`litecommerce-admin/`): ứng dụng React/Vite dành cho nhân viên/admin
- **Backend API** (`litecommerce-backend/`): REST API sử dụng NestJS, phục vụ cho Shop/Admin

Tài liệu mô tả bối cảnh (context) và từ vựng miền (domain glossary) nằm tại:
- `CONTEXT-MAP.md` (tổng quan Shop/Admin/Backend)
- `litecommerce-shop/CONTEXT.md`, `litecommerce-admin/CONTEXT.md`, `litecommerce-backend/CONTEXT.md`

Yêu cầu chức năng và luồng người dùng (viết bằng tiếng Việt) nằm tại:
- `resources/guide.txt`

Tham chiếu cấu trúc CSDL:
- `resources/db_diagram.txt`

Danh sách trạng thái và dữ liệu tra cứu:
- `resources/orderstatus.txt`
- `resources/provinces.txt`

Các bản tóm tắt theo từng “phiên làm việc” của AI agent:
- `resources/agent_session_done/`

---

## Đã đạt được gì cho đến hiện tại?

### Kiến trúc codebase đã có đủ (Shop + Admin + Backend)
- 2 ứng dụng frontend dạng Vite:
  - `litecommerce-shop/`
  - `litecommerce-admin/`
- 1 backend NestJS:
  - `litecommerce-backend/`

### Cải tiến ở Shop frontend (phiên 2026-05-28)
Theo `resources/agent_session_done/2026-05-28_shop-frontend-adjustments_summary.md`, Shop frontend đã được chỉnh UI để xử lý 2 vấn đề chính:

1) **Vấn đề layout ở Cart (`/cart`)**
- Điều khiển số lượng vẫn dùng được trên màn hình nhỏ
- Tên sản phẩm hiển thị không làm “đẩy” các khu vực khác ra khỏi khung giao diện
- File liên quan:
  - `litecommerce-shop/src/pages/Cart/Cart.jsx`

2) **Hành vi “Đổi mật khẩu” ở Profile (inline thay vì điều hướng trang)**
- “Đổi mật khẩu” giờ hiển thị inline bên trong trang `Profile` thay vì điều hướng tới route riêng
- File liên quan:
  - `litecommerce-shop/src/pages/Account/Profile.jsx`
  - `litecommerce-shop/src/pages/Account/ChangePasswordInline.jsx`

---

## Cách thiết lập và chạy (Setup & Run)

> Repo là monorepo nên thường chạy độc lập từng phần: Backend / Shop / (tuỳ chọn) Admin.

### 1) Chạy Backend (NestJS)
Vào thư mục:
- `litecommerce-backend/`

Chạy:
```bash
npm install
npm run start
```

### 2) Chạy Shop frontend (React/Vite)
Vào thư mục:
- `litecommerce-shop/`

Chạy:
```bash
npm install
npm run dev
```

Sau đó mở URL dev server mà Vite in ra.

### 3) Chạy Admin frontend (tuỳ chọn)
Vào thư mục:
- `litecommerce-admin/`

Chạy:
```bash
npm install
npm run dev
```

---

## Nhánh đang làm việc (Branch context)
`Introduce.md` cho biết dự án đang phát triển trên:
- `feature-backend+shop`
để tích hợp backend với Shop frontend.

---
