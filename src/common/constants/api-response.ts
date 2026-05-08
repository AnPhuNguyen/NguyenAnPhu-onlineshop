import { ApiResponseOptions } from '@nestjs/swagger';
import { AUTH_MESSAGES } from './messages';

/**
 * Các ApiResponseOptions có thể tái sử dụng cho Swagger documentation
 * Sử dụng cho controller decorators
 */

// Authentication Response Options
export const AUTH_RESPONSES = {
  /**
   * Response cho đăng nhập thành công
   */
  LOGIN_SUCCESS: {
    status: 200,
    description: 'Đăng nhập thành công',
  } as ApiResponseOptions,

  /**
   * Response cho đăng nhập thất bại
   */
  LOGIN_FAILED: {
    status: 401,
    description: AUTH_MESSAGES.INVALID_CREDENTIALS,
  } as ApiResponseOptions,

  /**
   * Response cho đăng ký thành công
   */
  REGISTER_SUCCESS: {
    status: 201,
    description: 'Đăng ký thành công',
  } as ApiResponseOptions,

  /**
   * Response cho email đã tồn tại
   */
  EMAIL_EXISTS: {
    status: 409,
    description: AUTH_MESSAGES.EMAIL_ALREADY_EXISTS,
  } as ApiResponseOptions,

  /**
   * Response cho token không hợp lệ
   */
  INVALID_TOKEN: {
    status: 401,
    description: AUTH_MESSAGES.TOKEN_INVALID,
  } as ApiResponseOptions,

  /**
   * Response cho token không tìm thấy
   */
  TOKEN_NOT_FOUND: {
    status: 401,
    description: AUTH_MESSAGES.TOKEN_NOT_FOUND,
  } as ApiResponseOptions,
} as const;

// Product Response Options
export const PRODUCT_RESPONSES = {
  /**
   * Response cho lấy danh sách sản phẩm thành công
   */
  GET_PRODUCTS_SUCCESS: {
    status: 200,
    description: 'Lấy danh sách sản phẩm thành công',
  } as ApiResponseOptions,

  /**
   * Response cho lấy chi tiết sản phẩm thành công
   */
  GET_PRODUCT_SUCCESS: {
    status: 200,
    description: 'Lấy chi tiết sản phẩm thành công',
  } as ApiResponseOptions,

  /**
   * Response cho sản phẩm không tìm thấy
   */
  PRODUCT_NOT_FOUND: {
    status: 404,
    description: 'Không tìm thấy sản phẩm',
  } as ApiResponseOptions,

  /**
   * Response cho lấy danh mục thành công
   */
  GET_CATEGORIES_SUCCESS: {
    status: 200,
    description: 'Lấy danh mục sản phẩm thành công',
  } as ApiResponseOptions,
} as const;

// Order Response Options
export const ORDER_RESPONSES = {
  /**
   * Response cho tạo đơn hàng thành công
   */
  CREATE_ORDER_SUCCESS: {
    status: 201,
    description: 'Tạo đơn hàng thành công',
  } as ApiResponseOptions,

  /**
   * Response cho lấy danh sách đơn hàng thành công
   */
  GET_ORDERS_SUCCESS: {
    status: 200,
    description: 'Lấy danh sách đơn hàng thành công',
  } as ApiResponseOptions,

  /**
   * Response cho lấy chi tiết đơn hàng thành công
   */
  GET_ORDER_SUCCESS: {
    status: 200,
    description: 'Lấy chi tiết đơn hàng thành công',
  } as ApiResponseOptions,

  /**
   * Response cho hủy đơn hàng thành công
   */
  CANCEL_ORDER_SUCCESS: {
    status: 200,
    description: 'Hủy đơn hàng thành công',
  } as ApiResponseOptions,

  /**
   * Response cho không thể hủy đơn hàng
   */
  CANNOT_CANCEL_ORDER: {
    status: 403,
    description: 'Không thể hủy đơn hàng ở trạng thái này',
  } as ApiResponseOptions,

  /**
   * Response cho đơn hàng không tìm thấy
   */
  ORDER_NOT_FOUND: {
    status: 404,
    description: 'Không tìm thấy đơn hàng',
  } as ApiResponseOptions,

  /**
   * Response cho giỏ hàng trống
   */
  CART_EMPTY: {
    status: 400,
    description: 'Giỏ hàng trống',
  } as ApiResponseOptions,
} as const;

// Cart Response Options
export const CART_RESPONSES = {
  /**
   * Response cho lấy giỏ hàng thành công
   */
  GET_CART_SUCCESS: {
    status: 200,
    description: 'Lấy giỏ hàng thành công',
  } as ApiResponseOptions,

  /**
   * Response cho thêm sản phẩm vào giỏ hàng thành công
   */
  ADD_TO_CART_SUCCESS: {
    status: 200,
    description: 'Thêm sản phẩm vào giỏ hàng thành công',
  } as ApiResponseOptions,

  /**
   * Response cho sản phẩm không tồn tại
   */
  PRODUCT_NOT_FOUND: {
    status: 404,
    description: 'Sản phẩm không tồn tại',
  } as ApiResponseOptions,

  /**
   * Response cho xóa sản phẩm khỏi giỏ hàng thành công
   */
  REMOVE_FROM_CART_SUCCESS: {
    status: 200,
    description: 'Xóa sản phẩm khỏi giỏ hàng thành công',
  } as ApiResponseOptions,

  /**
   * Response cho cập nhật số lượng thành công
   */
  UPDATE_QUANTITY_SUCCESS: {
    status: 200,
    description: 'Cập nhật số lượng thành công',
  } as ApiResponseOptions,

  /**
   * Response cho xóa giỏ hàng thành công
   */
  CLEAR_CART_SUCCESS: {
    status: 200,
    description: 'Xóa giỏ hàng thành công',
  } as ApiResponseOptions,
} as const;

// Common Response Options
export const COMMON_RESPONSES = {
  /**
   * Response cho thành công chung
   */
  SUCCESS: {
    status: 200,
    description: 'Thành công',
  } as ApiResponseOptions,

  /**
   * Response cho tạo thành công chung
   */
  CREATED: {
    status: 201,
    description: 'Tạo thành công',
  } as ApiResponseOptions,

  /**
   * Response cho bad request chung
   */
  BAD_REQUEST: {
    status: 400,
    description: 'Yêu cầu không hợp lệ',
  } as ApiResponseOptions,

  /**
   * Response cho unauthorized chung
   */
  UNAUTHORIZED: {
    status: 401,
    description: 'Bạn chưa đăng nhập',
  } as ApiResponseOptions,

  /**
   * Response cho forbidden chung
   */
  FORBIDDEN: {
    status: 403,
    description: 'Bạn không có quyền truy cập',
  } as ApiResponseOptions,

  /**
   * Response cho not found chung
   */
  NOT_FOUND: {
    status: 404,
    description: 'Không tìm thấy tài nguyên',
  } as ApiResponseOptions,

  /**
   * Response cho conflict chung
   */
  CONFLICT: {
    status: 409,
    description: 'Xung đột tài nguyên',
  } as ApiResponseOptions,

  /**
   * Cart responses
   */
  CART_RESPONSES: {
    GET_CART_SUCCESS: {
      status: 200,
      description: 'Lấy thông tin giỏ hàng thành công',
    } as ApiResponseOptions,
    ADD_TO_CART_SUCCESS: {
      status: 200,
      description: 'Thêm sản phẩm vào giỏ hàng thành công',
    } as ApiResponseOptions,
    PRODUCT_NOT_FOUND: {
      status: 404,
      description: 'Sản phẩm không tồn tại',
    } as ApiResponseOptions,
  },

  /**
   * Response cho internal server error chung
   */
  INTERNAL_SERVER_ERROR: {
    status: 500,
    description: 'Lỗi server nội bộ',
  } as ApiResponseOptions,
} as const;
