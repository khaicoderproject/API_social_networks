export const HTTP_STATUS = {
  // Success responses
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // Redirection messages
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  NOT_MODIFIED: 304,

  // Client error responses (Validator related)
  BAD_REQUEST: 400, // Request không hợp lệ (lỗi chung)
  UNAUTHORIZED: 401, // Không có quyền xác thực
  FORBIDDEN: 403, // Truy cập bị từ chối
  NOT_FOUND: 404, // Tài nguyên không tồn tại
  METHOD_NOT_ALLOWED: 405, // Phương thức HTTP không được hỗ trợ
  CONFLICT: 409, // Xung đột dữ liệu
  GONE: 410, // Tài nguyên đã bị xóa
  LENGTH_REQUIRED: 411, // Thiếu trường `Content-Length`
  PAYLOAD_TOO_LARGE: 413, // Payload vượt kích thước cho phép
  URI_TOO_LONG: 414, // URI quá dài
  UNSUPPORTED_MEDIA_TYPE: 415, // Kiểu media không được hỗ trợ
  UNPROCESSABLE_ENTITY: 422, // Dữ liệu không hợp lệ (cụ thể cho validator)
  TOO_MANY_REQUESTS: 429, // Request bị chặn do gửi quá nhiều

  // Server error responses
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
}
