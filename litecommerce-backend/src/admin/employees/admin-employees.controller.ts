import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Put, Query, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { AdminEmployeesService } from './admin-employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ResetEmployeePasswordDto } from './dto/reset-employee-password.dto';
import { ChangeEmployeeRoleDto } from './dto/change-employee-role.dto';
import { EmployeeQueryDto } from './dto/employee-query.dto';

@ApiTags('admin-employees')
@ApiBearerAuth('JWT-auth')
@Controller('admin/employees')
export class AdminEmployeesController {
  constructor(private readonly adminEmployeesService: AdminEmployeesService) {}

  // employee chỉ xem
  @Get()
  @Roles('employee')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lấy danh sách nhân viên' })
  async getEmployees(@Query() query: EmployeeQueryDto) {
    return this.adminEmployeesService.getEmployees(query);
  }

  @Get(':id')
  @Roles('employee')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lấy chi tiết nhân viên' })
  @ApiParam({ name: 'id' })
  async getEmployee(@Param('id') id: string) {
    return this.adminEmployeesService.getEmployeeById(Number(id));
  }

  @Post()
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Tạo nhân viên' })
  async create(@Body() dto: CreateEmployeeDto) {
    return this.adminEmployeesService.createEmployee(dto);
  }

  @Put(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cập nhật nhân viên (không bao gồm password/role)' })
  async update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    return this.adminEmployeesService.updateEmployee(Number(id), dto);
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Xóa nhân viên' })
  async remove(@Param('id') id: string) {
    return this.adminEmployeesService.deleteEmployee(Number(id));
  }

  @Put('change-role/:id')
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Đổi quyền nhân viên' })
  async changeRole(@Param('id') id: string, @Body() dto: ChangeEmployeeRoleDto) {
    return this.adminEmployeesService.changeRole(Number(id), dto);
  }

  @Put('change-password/:id')
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Đổi mật khẩu nhân viên (resetPassword -> changePassword)' })
  async changePassword(@Param('id') id: string, @Body() dto: ResetEmployeePasswordDto) {

    return this.adminEmployeesService.changePassword(Number(id), dto);
  }
}

