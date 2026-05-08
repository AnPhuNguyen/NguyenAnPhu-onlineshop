import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { AUTH_MESSAGES } from '../../common/constants/messages';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Customer } from '../../common/entities/customer.entity';
import { HashUtil } from '../../common/utils/hash.util';
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
  ) {}

  /**
   * Đăng nhập khách hàng
   * @param loginDto - Thông tin đăng nhập
   * @returns JWT token và thông tin user
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const hashedPassword = HashUtil.hashPassword(password);

    const customer = await this.customerRepository.findOne({
      where: { email, password: hashedPassword, isLocked: 0 },
    });

    if (!customer) {
      throw new UnauthorizedException(AUTH_MESSAGES.EMAIL_OR_PASSWORD_INVALID);
    }

    const payload = {
      userId: customer.customerId,
      email: customer.email,
      roles: ['customer'],
      userType: 'customer',
    };

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user: {
        userId: customer.customerId,
        email: customer.email,
        roles: ['customer'],
        userType: 'customer',
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

    const hashedPassword = HashUtil.hashPassword(password);

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
