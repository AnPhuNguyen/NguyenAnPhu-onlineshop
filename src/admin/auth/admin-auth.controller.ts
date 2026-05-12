import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { AUTH_RESPONSES, COMMON_RESPONSES } from '../../common/constants/api-response';
import { AdminLoginDto } from './dto/login.dto';
import { AdminAuthService } from './admin-auth.service';

@ApiTags('admin-auth')
@Controller('admin/auth')
export class AdminAuthController {
  constructor(private adminAuthService: AdminAuthService) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Đăng nhập admin/employee' })
  @ApiResponse(AUTH_RESPONSES.LOGIN_SUCCESS)
  @ApiResponse(AUTH_RESPONSES.LOGIN_FAILED)
  async login(@Body() loginDto: AdminLoginDto) {
    return this.adminAuthService.login(loginDto);
  }

  @Post('logout')
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Đăng xuất' })
  @ApiResponse(COMMON_RESPONSES.SUCCESS)
  async logout() {
    return this.adminAuthService.logout();
  }
}

