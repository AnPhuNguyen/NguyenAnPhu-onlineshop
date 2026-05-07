import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ShopAuthService } from './shop-auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AUTH_RESPONSES } from '../../common/constants/api-response';
import { Public } from '../../common/decorators/public.decorator';

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
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Đăng nhập khách hàng' })
  @ApiResponse(AUTH_RESPONSES.LOGIN_SUCCESS)
  @ApiResponse(AUTH_RESPONSES.LOGIN_FAILED)
  async login(@Body() loginDto: LoginDto) {
    return this.shopAuthService.login(loginDto);
  }

  /**
   * API đăng ký tài khoản khách hàng mới
   * @param registerDto - Thông tin đăng ký
   * @returns Thông tin khách hàng đã tạo
   */
  @Post('register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Đăng ký tài khoản khách hàng' })
  @ApiResponse(AUTH_RESPONSES.REGISTER_SUCCESS)
  @ApiResponse(AUTH_RESPONSES.EMAIL_EXISTS)
  async register(@Body() registerDto: RegisterDto) {
    return this.shopAuthService.register(registerDto);
  }
}
