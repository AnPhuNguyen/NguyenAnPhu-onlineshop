import { SetMetadata } from '@nestjs/common';

/**
 * Decorator đánh dấu endpoint là public (không cần authentication)
 */
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
