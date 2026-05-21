import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

/**
 * Service xử lý bảo mật thông tin xác thực (Credential Security).
 * Cung cấp các phương thức băm mật khẩu và kiểm tra mật khẩu.
 * Hỗ trợ băm MD5 cho legacy và có khả năng mở rộng sang các phương thức bảo mật hơn (bcrypt).
 */
@Injectable()
export class CredentialSecurityService {
    /**
     * Băm mật khẩu (Mặc định sử dụng MD5 cho legacy).
     * @param password Mật khẩu thô.
     */
    hashPassword(password: string): string {
        return this.hashMd5(password);
    }

    /**
     * Kiểm tra mật khẩu thô với mã băm đã lưu.
     * Tự động phát hiện định dạng băm (MD5 legacy hoặc các định dạng hiện đại có prefix).
     * @param password Mật khẩu thô.
     * @param hash Mã băm đã lưu trong CSDL.
     */
    async verifyPassword(password: string, hash: string): Promise<boolean> {
        if (!hash) return false;

        // Phát hiện định dạng: Các hash hiện đại (bcrypt, argon2) thường bắt đầu bằng '$'
        if (hash.startsWith('$')) {
            // TODO: Hiện thực kiểm tra bcrypt khi cần thiết
            // return bcrypt.compare(password, hash);
            return false;
        }

        // Mặc định là MD5 legacy (32 ký tự hex)
        return this.hashMd5(password) === hash.toLowerCase();
    }

    /**
     * Hiện thực băm MD5.
     */
    private hashMd5(data: string): string {
        return crypto.createHash('md5').update(data).digest('hex');
    }
}
