import { SetMetadata } from '@nestjs/common';

/**
 * Decorator đánh dấu các roles được phép truy cập endpoint
 * @param roles - Mảng các role được phép
 */
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
