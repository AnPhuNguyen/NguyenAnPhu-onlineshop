import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ShopAuthService } from './shop-auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

/**
 * Controller xử lý authentication cho khách hàng
 * Cung cấp API đăng nhập và đăng ký
 */
@ApiTags('shop-auth')
@Controller('shop/auth')
export class ShopAuthController {
  constructor(private shopAuthService: ShopAuthService) {}

  /**
   * API đăng nhập cho khách hàng
   * @param loginDto - Thông tin đăng nhập
   * @returns JWT token và thông tin user
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Đăng nhập khách hàng' })
  @ApiResponse({ status: 200, description: 'Đăng nhập thành công' })
  @ApiResponse({ status: 401, description: 'Sai email hoặc mật khẩu' })
  async login(@Body() loginDto: LoginDto) {
    return this.shopAuthService.login(loginDto);
  }

  /**
   * API đăng ký tài khoản khách hàng mới
   * @param registerDto - Thông tin đăng ký
   * @returns Thông tin khách hàng đã tạo
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Đăng ký tài khoản khách hàng' })
  @ApiResponse({ status: 201, description: 'Đăng ký thành công' })
  @ApiResponse({ status: 409, description: 'Email đã tồn tại' })
  async register(@Body() registerDto: RegisterDto) {
    return this.shopAuthService.register(registerDto);
  }
}
