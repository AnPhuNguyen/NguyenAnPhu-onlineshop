import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Employee } from '../../common/entities/employee.entity';
import { CredentialSecurityService } from '../../common/modules/credential-security/credential-security.service';
import { AUTH_MESSAGES } from '../../common/constants/messages';
import { AdminLoginDto } from './dto/login.dto';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private jwtService: JwtService,
    private securityService: CredentialSecurityService,
  ) { }

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

      // Tìm nhân viên theo email
      const employee = await this.employeeRepository.findOne({
        where: { email },
      });

      if (!employee || Number(employee.isWorking) !== 1) {
        throw new UnauthorizedException(AUTH_MESSAGES.EMAIL_OR_PASSWORD_INVALID);
      }

      // Kiểm tra mật khẩu (Băm mật khẩu và so sánh - hỗ trợ legacy MD5 và định dạng mới)
      const isPasswordValid = await this.securityService.verifyPassword(password, employee.password || '');
      if (!isPasswordValid) {
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

