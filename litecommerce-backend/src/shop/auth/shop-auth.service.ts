import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { AUTH_MESSAGES } from '../../common/constants/messages';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Customer } from '../../common/entities/customer.entity';
import { CredentialSecurityService } from '../../common/modules/credential-security/credential-security.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

/**
 * Service xử lý authentication cho khách hàng
 * Bao gồm đăng nhập, đăng ký, đổi mật khẩu
 */
@Injectable()
export class ShopAuthService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private jwtService: JwtService,
    private securityService: CredentialSecurityService,
  ) { }

  /**
   * Đăng nhập khách hàng
   * @param loginDto - Thông tin đăng nhập
   * @returns JWT token và thông tin user
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const customer = await this.customerRepository.findOne({
      where: { email, isLocked: 0 },
    });

    if (!customer) {
      throw new UnauthorizedException(AUTH_MESSAGES.EMAIL_OR_PASSWORD_INVALID);
    }

    const isPasswordValid = await this.securityService.verifyPassword(password, customer.password || '');
    if (!isPasswordValid) {
      throw new UnauthorizedException(AUTH_MESSAGES.EMAIL_OR_PASSWORD_INVALID);
    }

    const payload = {
      userId: customer.customerId,
      email: customer.email,
      roles: ['customer'],
      userType: 'customer',

      // Thông tin hồ sơ để frontend tự đổ dữ liệu
      customerName: customer.customerName,
      phone: customer.phone,
      province: customer.province,
      address: customer.address,
    };

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user: {
        userId: customer.customerId,
        email: customer.email,
        roles: ['customer'],
        userType: 'customer',

        // Theo naming frontend đang dùng: customerName/phone/province/address
        customerName: customer.customerName,
        phone: customer.phone,
        province: customer.province,
        address: customer.address,

        // Giữ lại fullName để không phá các nơi khác (nếu có)
        fullName: customer.customerName,
      },
    };
  }

  /**
   * Đăng ký tài khoản khách hàng mới
   * @param registerDto - Thông tin đăng ký
   * @returns Thông tin khách hàng đã tạo
   */
  async register(registerDto: RegisterDto) {
    const { customerName, email, password, confirmPassword } = registerDto;

    if (password !== confirmPassword) {
      throw new ConflictException(AUTH_MESSAGES.PASSWORD_MISMATCH);
    }

    const existingCustomer = await this.customerRepository.findOne({
      where: { email },
    });

    if (existingCustomer) {
      throw new ConflictException(AUTH_MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    const hashedPassword = this.securityService.hashPassword(password);

    const customer = this.customerRepository.create({
      customerName,
      contactName: customerName,
      email,
      password: hashedPassword,
      isLocked: 0,
    });

    await this.customerRepository.save(customer);

    return {
      message: 'Đăng ký thành công',
      customerId: customer.customerId,
    };
  }
}
