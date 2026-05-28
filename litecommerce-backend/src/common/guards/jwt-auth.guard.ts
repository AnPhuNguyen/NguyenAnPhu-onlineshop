import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { CanActivate } from '@nestjs/common';

/**
 * Guard kiểm tra JWT token cho mọi request
 * Bỏ qua các endpoint được đánh dấu @Public()
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Kiểm tra nếu route được đánh dấu @Public() thì bỏ qua xác thực
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    // eslint-disable-next-line no-console
    console.log('\n[jwt-auth][canActivate][tokenExtract]\n', {
      tokenPresent: !!token,
      tokenLength: token?.length ?? 0,
      authorizationHeaderPresent: !!(request?.headers?.authorization || request?.headers?.Authorization),
    });

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      // Verify token và gắn payload vào request để các controller sử dụng
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || 'your-secret-key',
      });
      request['user'] = payload;

      // eslint-disable-next-line no-console
      console.log('\n[jwt-auth][canActivate][verified]\n', {
        userId: (payload as any)?.userId,
        roles: (payload as any)?.roles,
        userType: (payload as any)?.userType,
      });

      return true;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('\n[jwt-auth][canActivate][verifyFailed]\n', { message: (e as any)?.message });
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  /**
   * Trích xuất JWT token từ Authorization header dạng Bearer
   * - case-insensitive header name
   * - tolerate multiple spaces
   */
  private extractTokenFromHeader(request: any): string | undefined {
    const headers = request?.headers ?? {};
    const authHeader = headers.authorization ?? headers.Authorization;

    if (!authHeader || typeof authHeader !== 'string') return undefined;

    // Expected: "Bearer <token>"
    const [scheme, ...rest] = authHeader.trim().split(/\s+/);
    if (!scheme || scheme.toLowerCase() !== 'bearer') return undefined;

    const token = rest.join(' ').trim();
    return token || undefined;
  }
}
