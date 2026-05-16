import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { AUTH_MESSAGES } from '../constants/messages';
  
/**
 * Guard kiểm tra quyền truy cập dựa trên role
 * Chỉ cho phép user có role phù hợp truy cập endpoint
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user) return false; // ← fix

    const userRoles = user.roles || [];
// also allow by userType (shop uses 'customer', admin uses 'employee')
    const userType = typeof user.userType === 'string' ? user.userType : undefined;

    const hasRole = requiredRoles.some((role) => {
      return userRoles.includes(role) || (userType ? userType === role : false);
    });

    if (!hasRole) {
      throw new ForbiddenException(AUTH_MESSAGES.ROLE_INVALID);
    }


    return true;
  }
}
