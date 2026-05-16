# TODO - LiteCommerce Admin Module (backend)

## Step 1: Integrate AdminModule
- [x] Create `litecommerce-backend/src/admin/admin.module.ts`
- [x] Import `AdminModule` into `litecommerce-backend/src/app.module.ts`

## Step 2: Admin Auth (priority)
- [x] Create `litecommerce-backend/src/admin/auth/*`
  - [x] `admin-auth.controller.ts` with `POST /api/admin/auth/login`
  - [x] `admin-auth.service.ts` validate employee email/password, check roleNames contains `employee`/`admin`
  - [x] Ensure JWT payload includes `user.roles: string[]` to satisfy `RolesGuard`
  - [x] `POST /api/admin/auth/logout` (clear admin cart session if applicable)


## Step 3: Categories / Suppliers / Shippers CRUD (simple)
- [x] Create modules + controllers + services:
  - [x] `admin-categories`
  - [x] `admin-suppliers`
  - [x] `admin-shippers`

## Step 4: Products / Attributes / Photos (complex)
- [x] Create modules:
  - [x] `admin-products`
  - [x] `admin-product-attributes`
  - [] `admin-product-photos`

## Step 5: Employees / Customers (user management)
- [x] Create modules:
  - [x] `admin-employees`
  - [x] `admin-customers`

## Step 6: Cart (admin) + Orders (business logic)
- [ ] `admin-cart` (session-based; no DB persistence unless project already has infra)
- [ ] `admin-orders`
  - [ ] Implement order status transition flow strictly:
    - [ ] 1→2→3→4
    - [ ] (1/2)→(-2/-1)
    - [ ] 3→-2
    - [ ] -2→-1
    - [ ] -2→3
  - [ ] Assign EmployeeID when status=2
  - [ ] Assign ShipperID when status=3

## Step 7: Verify
- [ ] `npm run build` in `litecommerce-backend`
- [ ] Swagger check: endpoints appear with tag `admin-*`
- [ ] RBAC check: employee cannot call admin-only endpoints
