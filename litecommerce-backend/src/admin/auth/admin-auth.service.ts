import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Employee } from '../../common/entities/employee.entity';
import { HashUtil } from '../../common/utils/hash.util';
import { AUTH_MESSAGES } from '../../common/constants/messages';
import { AdminLoginDto } from './dto/login.dto';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private jwtService: JwtService,
  ) {}

  private parseRoles(roleNames: string | null | undefined): string[] {
    if (!roleNames) return [];
    return roleNames
      .split(',')
      .map((r) => r.trim())
      .filter(Boolean);
  }

  async login(loginDto: AdminLoginDto) {
    try {
      const { email, password } = loginDto;
      const hashedPassword = HashUtil.hashPassword(password);

      // Kiểm tra email + password hash MD5
      const employee = await this.employeeRepository.findOne({
        where: { email, password: hashedPassword },
      });

      const isWorking = Number(employee?.isWorking);
      if (!employee || isWorking !== 1) {
        throw new UnauthorizedException(AUTH_MESSAGES.EMAIL_OR_PASSWORD_INVALID);
      }

      const roleNames = this.parseRoles(employee.roleNames);

      // Rule: chỉ cho phép đăng nhập nếu roleNames chứa đúng employee/admin
      const allowed = roleNames.includes('employee') || roleNames.includes('admin');
      if (!allowed) {
        throw new UnauthorizedException(AUTH_MESSAGES.INVALID_CREDENTIALS);
      }

      // RolesGuard đang check user.roles (string[])
      const payload = {
        userId: employee.employeeId,
        email: employee.email,
        roles: roleNames,
        userType: 'employee',
        fullName: employee.fullName,
      };

      return {
        access_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
        user: {
          userId: employee.employeeId,
          email: employee.email,
          roles: roleNames,
          userType: 'employee',
          fullName: employee.fullName,
        },
      };
    } catch (err: any) {
      // Giúp bạn nhìn ra lỗi thật trong terminal
      // eslint-disable-next-line no-console
      console.error('[AdminAuthService.login] error:', err?.message ?? err);

      throw new UnauthorizedException(AUTH_MESSAGES.EMAIL_OR_PASSWORD_INVALID);
    }
  }

  async logout() {
    // Giỏ hàng admin sẽ được hiện thực ở bước cart (session-based in-memory/Map).
    return { message: 'Đăng xuất thành công' };
  }
}

