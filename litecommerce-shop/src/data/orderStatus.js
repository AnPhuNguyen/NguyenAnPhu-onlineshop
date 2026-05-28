// src/data/orderStatus.js
// Thông tin trạng thái đơn hàng từ database và cấu hình màu sắc UI
export const ORDER_STATUS = {
    '-2': {
        label: 'Bị từ chối',
        description: 'Đơn hàng bị từ chối',
        color: 'bg-red-100 text-red-700 border border-red-200'
    },
    '-1': {
        label: 'Đã hủy',
        description: 'Đơn hàng đã bị hủy',
        color: 'bg-gray-100 text-gray-700 border border-gray-200'
    },
    '1': {
        label: 'Đơn mới',
        description: 'Đơn hàng vừa gửi/khởi tạo',
        color: 'bg-blue-100 text-blue-700 border border-blue-200'
    },
    '2': {
        label: 'Đã duyệt',
        description: 'Đơn hàng đã chấp nhận',
        color: 'bg-indigo-100 text-indigo-700 border border-indigo-200'
    },
    '3': {
        label: 'Đang vận giao',
        description: 'Đơn hàng đang được vận chuyển',
        color: 'bg-orange-100 text-orange-700 border border-orange-200'
    },
    '4': {
        label: 'Hoàn tất',
        description: 'Đơn hàng đã hoàn tất',
        color: 'bg-green-100 text-green-700 border border-green-200'
    },
};

/**
 * Hàm lấy thông tin trạng thái theo mã
 * @param {number|string} status 
 */
export const getStatusInfo = (status) => {
    return ORDER_STATUS[String(status)] || {
        label: 'Không rõ',
        description: 'Không xác định',
        color: 'bg-gray-100 text-gray-700'
    };
};
