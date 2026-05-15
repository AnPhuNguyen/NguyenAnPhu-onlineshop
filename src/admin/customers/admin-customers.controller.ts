import { Body, Controller, Get, HttpCode, HttpStatus, Param, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { CustomerQueryDto } from './dto/customer-query.dto';
import { ResetCustomerPasswordDto } from './dto/reset-customer-password.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { AdminCustomersService } from './admin-customers.service';

@ApiTags('admin-customers')
@ApiBearerAuth('JWT-auth')
@Controller('admin/customers')
export class AdminCustomersController {
  constructor(private readonly adminCustomersService: AdminCustomersService) {}

  @Get()
  @Roles('employee')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lấy danh sách khách hàng' })
  async getCustomers(@Query() query: CustomerQueryDto) {
    return this.adminCustomersService.getCustomers(query);
  }

  @Get(':id')
  @Roles('employee')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lấy chi tiết khách hàng' })
  @ApiParam({ name: 'id' })
  async getCustomer(@Param('id') id: string) {
    return this.adminCustomersService.getCustomerById(Number(id));
  }

  @Put(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cập nhật thông tin khách hàng (không bao gồm password)' })
  async updateCustomer(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    return this.adminCustomersService.updateCustomer(Number(id), dto);
  }

  @Put('reset-password/:id')
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset/đổi mật khẩu khách hàng' })
  async resetPassword(
    @Param('id') id: string,
    @Body() dto: ResetCustomerPasswordDto,
  ) {
    return this.adminCustomersService.resetPassword(Number(id), dto);
  }
}
