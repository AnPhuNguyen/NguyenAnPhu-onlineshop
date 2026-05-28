# README — LiteCommerce (Monorepo)

## What this project is
**LiteCommerce** is a multi-project monorepo for an online shopping system containing:
- **Shop frontend** (`litecommerce-shop/`): customer-facing React/Vite app
- **Admin frontend** (`litecommerce-admin/`): staff/admin React/Vite app
- **Backend API** (`litecommerce-backend/`): NestJS REST API serving the app(s)

Project context and domain vocabulary are documented here:
- `CONTEXT-MAP.md` (overview of Shop/Admin/Backend contexts)
- `litecommerce-shop/CONTEXT.md`, `litecommerce-admin/CONTEXT.md`, `litecommerce-backend/CONTEXT.md` (glossaries)

Functional requirements and user flows (Vietnamese) are described in:
- `resources/guide.txt`

Database structure reference:
- `resources/db_diagram.txt`

Static/lookup lists:
- `resources/orderstatus.txt`
- `resources/provinces.txt`

Session/iteration summaries from prior AI agent runs:
- `resources/agent_session_done/`

---

## What has been achieved so far
### Codebase structure exists (Shop + Admin + Backend)
- Frontend apps are present and runnable as separate Vite projects:
  - `litecommerce-shop/`
  - `litecommerce-admin/`
- A NestJS backend project exists at:
  - `litecommerce-backend/`

### Shop frontend improvements (2026-05-28 session)
From `resources/agent_session_done/2026-05-28_shop-frontend-adjustments_summary.md`, the shop frontend UI was adjusted to fix:
1. **Cart (`/cart`) layout issues**
   - Quantity controls remain usable on smaller viewports.
   - Product name wrapping prevents cart layout from pushing other UI sections out of bounds.
   - Key file:
     - `litecommerce-shop/src/pages/Cart/Cart.jsx`
2. **Profile “Đổi mật khẩu” inline behavior**
   - “Đổi mật khẩu” now swaps inline content inside `Profile` instead of navigating away to a dedicated route.
   - Key files:
     - `litecommerce-shop/src/pages/Account/Profile.jsx`
     - Added `litecommerce-shop/src/pages/Account/ChangePasswordInline.jsx`

---

## Setup & run

> This is a monorepo. Each sub-project is run independently.

### 1) Backend (NestJS)
Go to `litecommerce-backend/` and run:
```bash
npm install
npm run start
```

### 2) Shop frontend (React/Vite)
Go to `litecommerce-shop/` and run:
```bash
npm install
npm run dev
```

### 3) Admin frontend (optional)
Go to `litecommerce-admin/` and run:
```bash
npm install
npm run dev
```

## Current branch context
`Introduce.md` indicates development is happening on:
- `feature-backend+shop`
to integrate backend with the shop frontend.

---
