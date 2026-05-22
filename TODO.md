# TODO: Fix issues in `feature-backend+shop`

## Step 1: Repo reading & evidence gathering
- [x] Analyze task + hypothesize likely root causes (401 interceptor, auth/user mapping, products UI data loading)
- [x] Search relevant frontend code (product/order/auth/profile)
- [x] Read key files:
  - [x] `litecommerce-shop/src/lib/api.js`
  - [x] `litecommerce-shop/src/lib/orderApi.js`
  - [x] `litecommerce-shop/src/store/orderStore.js`
  - [x] `litecommerce-shop/src/pages/Account/Profile.jsx`
  - [x] `litecommerce-shop/src/lib/productApi.js`
  - [x] `litecommerce-shop/src/store/authStore.js`

## Step 2: Add logging instrumentation (NO business logic changes)
- [x] Update `litecommerce-shop/src/lib/api.js` with console.log/warn/error for:
  - token presence + Authorization header set
  - 401 interceptor actions (path, status, token present)
  - request/response errors
- [x] Update `litecommerce-shop/src/lib/orderApi.js` to log before/after API calls + catch errors
- [x] Update `litecommerce-shop/src/lib/productApi.js` to log before/after API calls + catch errors
- [x] Update `litecommerce-shop/src/pages/Account/Profile.jsx` to log:
  - auth state and hydrated `user`
  - initial form values
- [x] Confirm formatting/build passes

## Step 3: Reproduce & analyze
- [ ] Re-test `/products`, `/profile`, `/orders` while logged in
- [ ] Collect console output + terminal logs

## Step 4: Apply targeted fixes
- [ ] Fix `/orders` 401 (auth header/token mismatch or backend guard issue)
- [ ] Fix `/profile` mapping (field mismatch in backend response vs frontend expects)
- [x] Fix `/products` empty list and category filter options
