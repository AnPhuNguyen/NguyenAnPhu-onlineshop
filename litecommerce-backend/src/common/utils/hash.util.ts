import * as crypto from 'crypto';

/**
 * Utility class xử lý hash password
 * Sử dụng MD5 để hash password theo yêu cầu của hệ thống
 */
export class HashUtil {
  /**
   * Hash password sử dụng MD5
   * @param password - Password cần hash
   * @returns Password đã được hash
   */
  static hashPassword(password: string): string {
    return crypto.createHash('md5').update(password).digest('hex');
  }

  /**
   * So sánh password với hash
   * @param password - Password cần kiểm tra
   * @param hashedPassword - Password đã hash từ database
   * @returns True nếu khớp, ngược lại false
   */
  static comparePassword(password: string, hashedPassword: string): boolean {
    const hashedInput = this.hashPassword(password);
    return hashedInput === hashedPassword;
  }
}
