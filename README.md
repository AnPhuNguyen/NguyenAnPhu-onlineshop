# LiteCommerce (Shop + Admin + Backend)

This repository is a multi-project monorepo for an online shop system called **LiteCommerce**, composed of:

- **Shop (Customer Frontend)**: `litecommerce-shop/` (React + Vite)
- **Admin (Employee/Manager Frontend)**: `litecommerce-admin/` (React + Vite)
- **Backend (API)**: `litecommerce-backend/` (NestJS)

See:
- `Introduce.md` for the high-level repo overview
- `CONTEXT-MAP.md` and each subproject `CONTEXT.md` for deeper context

---

## What has been achieved so far

### Shop frontend (recent adjustments)
Based on the latest recorded session **2026-05-28** (`resources/agent_session_done/2026-05-28_shop-frontend-adjustments_summary.md`), the Shop UI was improved in:

- **Cart UI**
  - Fixed layout/UX issues around **changing quantities** (`litecommerce-shop/src/pages/Cart/Cart.jsx`)
  - Improved text wrapping for long product names
  - Stabilized quantity control sizing on small viewports
- **Profile → Inline Change Password**
  - Changed “Đổi mật khẩu” behavior to **swap inline content** instead of navigating away (`litecommerce-shop/src/pages/Account/Profile.jsx`)
  - Added a dedicated component for the inline view:
    - `litecommerce-shop/src/pages/Account/ChangePasswordInline.jsx`

---

## Roles & key user flows (from project docs)

From `resources/guide.txt`, the system supports two major user types:

### Customers
- Login / registration (password stored as **MD5** in this project context)
- Product browsing + search/filter
- Cart management (add/edit quantity, remove items)
- Order placement and order status viewing
- Customer can cancel orders when allowed by the status flow

### Employees / Admin
- Login with role gating (`employee` / `employee,admin`)
- CRUD modules for products, product attributes, product photos, shippers, suppliers, employees, customers
- Order management and **controlled status transitions** following the defined workflow

---

## Database setup

The repository includes a MySQL/MariaDB dump at the repo root:

- `litecommercedb.sql`

### 1) Create / import the database
1. Start MySQL/MariaDB.
2. Import the dump:

```bash
# Example (adjust credentials / port as needed):
mysql -u <user> -p < litecommercedb.sql
```

> Notes:
> - The dump contains logic to make the import safer when the database doesn’t exist yet (`CREATE DATABASE IF NOT EXISTS` + `USE` are included).

### 2) Verify backend connectivity
Before running the backend, ensure the database credentials/config match the backend’s expected settings (see `litecommerce-backend/CONTEXT.md` / backend config files).

---

## How to set up & run

This monorepo is designed so you run each subproject independently.

### 0) Prerequisites
- Node.js (for `litecommerce-shop` and `litecommerce-admin`)
- Node.js + npm (for `litecommerce-backend`)
- MySQL/MariaDB (for the backend)
- (Optional) a browser to test the frontends

---

## 1) Run Backend (NestJS)

From the repo root:

```bash
cd litecommerce-backend
npm install
npm run start
```

---

## 2) Run Shop frontend (React/Vite)

From the repo root:

```bash
cd litecommerce-shop
npm install
npm run dev
```

---

## 3) Run Admin frontend (React/Vite)

From the repo root:

```bash
cd litecommerce-admin
npm install
npm run dev
```

---

## Ignored/generated files

Some folders/files are excluded from version control (typically generated artifacts, local caches, large/temporary content). They are intentionally not documented individually here—focus on the instructions above and the code under `litecommerce-shop/`, `litecommerce-admin/`, and `litecommerce-backend/`.

---

## References

- `Introduce.md`
- `CONTEXT-MAP.md`
- `resources/guide.txt`
- `resources/db_diagram.txt`
- `resources/agent_session_done/*` (session summaries of what was changed)
