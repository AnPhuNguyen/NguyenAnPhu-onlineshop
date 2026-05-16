/**
 * Các message có thể tái sử dụng trong toàn bộ ứng dụng
 * Sử dụng cho DTO validation và business logic
 */

// Authentication Messages
export const AUTH_MESSAGES = {
  // Login
  INVALID_CREDENTIALS: 'Email hoặc mật khẩu không đúng',
  EMAIL_OR_PASSWORD_INVALID: 'Email hoặc mật khẩu không đúng',
  
  // Register
  EMAIL_ALREADY_EXISTS: 'Email đã tồn tại',
  PASSWORD_MISMATCH: 'Mật khẩu xác nhận không khớp',
  PASSWORD_TOO_SHORT: 'Mật khẩu phải có ít nhất 6 ký tự',
  
  // Token
  TOKEN_NOT_FOUND: 'Token không tìm thấy được',
  TOKEN_INVALID: 'Phiên đăng nhập không hợp lệ',
  TOKEN_EXPIRED: 'Phiên đăng nhập đã hết hạn',

  //Roles
  ROLE_INVALID: 'Bạn không có quyền sử dụng chức năng này',
} as const;

// Customer Messages
export const CUSTOMER_MESSAGES = {
  NOT_FOUND: 'Không tìm thấy khách hàng',
  ACCOUNT_LOCKED: 'Tài khoản đã bị khóa',
  ACCOUNT_INACTIVE: 'Tài khoản chưa được kích hoạt',
} as const;

// Product Messages
export const PRODUCT_MESSAGES = {
  NOT_FOUND: 'Không tìm thấy sản phẩm',
  NOT_AVAILABLE: 'Sản phẩm đã ngừng bán',
  OUT_OF_STOCK: 'Sản phẩm đã hết hàng',
} as const;

// Order Messages
export const ORDER_MESSAGES = {
  NOT_FOUND: 'Không tìm thấy đơn hàng',
  CANNOT_CANCEL: 'Không thể hủy đơn hàng ở trạng thái này',
  ALREADY_CANCELLED: 'Đơn hàng đã bị hủy',
  ALREADY_COMPLETED: 'Đơn hàng đã hoàn thành',
  CART_EMPTY: 'Giỏ hàng trống',
} as const;

// Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'Trường này là bắt buộc',
  INVALID_EMAIL: 'Email không hợp lệ',
  INVALID_PHONE: 'Số điện thoại không hợp lệ',
  INVALID_NUMBER: 'Phải là số',
  INVALID_STRING: 'Phải là chuỗi',
  MIN_LENGTH: (min: number) => `Phải có ít nhất ${min} ký tự`,
  MAX_LENGTH: (max: number) => `Không được quá ${max} ký tự`,
  MIN_VALUE: (min: number) => `Phải lớn hơn hoặc bằng ${min}`,
  MAX_VALUE: (max: number) => `Phải nhỏ hơn hoặc bằng ${max}`,
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Đăng nhập thành công',
  REGISTER_SUCCESS: 'Đăng ký thành công',
  LOGOUT_SUCCESS: 'Đăng xuất thành công',
  CREATE_SUCCESS: 'Tạo thành công',
  UPDATE_SUCCESS: 'Cập nhật thành công',
  DELETE_SUCCESS: 'Xóa thành công',
  CANCEL_SUCCESS: 'Hủy thành công',
} as const;

/**
 * Error messages chung
 */
export const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: 'Lỗi server nội bộ',
  VALIDATION_ERROR: 'Lỗi validation',
  UNAUTHORIZED: 'Không có quyền truy cập',
  FORBIDDEN: 'Bạn không có quyền truy cập',
  NOT_FOUND: 'Không tìm thấy tài nguyên',
  CONFLICT: 'Xung đột tài nguyên',
};

/**
 * Cart messages
 */
export const CART_MESSAGES = {
  ITEM_NOT_FOUND: 'Sản phẩm không có trong giỏ hàng',
  INVALID_QUANTITY: 'Số lượng phải lớn hơn 0',
  PRODUCT_NOT_FOUND: 'Sản phẩm không tồn tại',
  CART_EMPTY: 'Giỏ hàng trống',
};
