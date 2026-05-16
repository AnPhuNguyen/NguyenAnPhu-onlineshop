import { Injectable, BadRequestException, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Employee } from '../../common/entities/employee.entity';
import { HashUtil } from '../../common/utils/hash.util';
import { ResetEmployeePasswordDto } from './dto/reset-employee-password.dto';
import { ChangeEmployeeRoleDto } from './dto/change-employee-role.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeQueryDto } from './dto/employee-query.dto';
import { SUCCESS_MESSAGES } from '../../common/constants/messages';

@Injectable()
export class AdminEmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) { }

  private parseRoles(roleNames: string): string[] {
    if (!roleNames) return [];
    return roleNames.split(',').map((r) => r.trim()).filter(Boolean);
  }

  private toRoleNames(roles: string[]): string {
    const set = new Set(roles);
    const allowed = ['employee', 'admin'];
    for (const r of set) {
      if (!allowed.includes(r)) {
        throw new BadRequestException('Invalid role');
      }
    }

    if (set.has('admin')) return 'employee,admin';
    return 'employee';
  }

  async getEmployees(query: EmployeeQueryDto) {
    const { keyword, role, workingStatus, page = 1, limit = 10 } = query;

    const findWhere: any = {};
    if (keyword) {
      findWhere.fullName = Like(`%${keyword}%`);
    }
    if (role) {
      findWhere.roleNames = role;
    }
    if (workingStatus) {
      findWhere.isWorking = workingStatus === 'working' ? 1 : 0;
    }

    const [items, total] = await this.employeeRepository.findAndCount({
      where: findWhere,
      skip: (page - 1) * limit,
      take: limit,
      order: { employeeId: 'DESC' },
    });

    const mapped = items.map((e) => ({
      id: e.employeeId,
      name: e.fullName,
      birthDate: e.birthDate,
      phone: e.phone,
      email: e.email,
      roles: e.roleNames ?? 'employee',
      isWorking: Boolean(e.isWorking),
    }));

    return {
      items: mapped,
      total,
      page,
      limit,
    };
  }

  async getEmployeeById(id: number) {
    const employee = await this.employeeRepository.findOne({ where: { employeeId: id } });
    if (!employee) throw new NotFoundException('Không tìm thấy nhân viên');

    return {
      id: employee.employeeId,
      fullName: employee.fullName,
      birthDate: employee.birthDate,
      phone: employee.phone,
      email: employee.email,
      address: employee.address,
      isWorking: Boolean(employee.isWorking),
      roleNames: employee.roleNames,
    };
  }

  async createEmployee(dto: CreateEmployeeDto) {
    const exists = await this.employeeRepository.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email đã tồn tại');

    const password = dto.password ?? '123456';

    const employee = this.employeeRepository.create({
      fullName: dto.fullName,
      birthDate: dto.birthDate,
      phone: dto.phone,
      email: dto.email,
      password: HashUtil.hashPassword(password),
      address: dto.address,
      isWorking: 1,
      roleNames: 'employee',
    });

    await this.employeeRepository.save(employee);

    return { message: SUCCESS_MESSAGES.CREATE_SUCCESS, id: employee.employeeId };
  }

  async updateEmployee(id: number, dto: UpdateEmployeeDto) {
    const employee = await this.employeeRepository.findOne({ where: { employeeId: id } });
    if (!employee) throw new NotFoundException('Không tìm thấy nhân viên');

    employee.fullName = dto.fullName;
    employee.birthDate = dto.birthDate ?? employee.birthDate;
    employee.phone = dto.phone ?? employee.phone;
    employee.address = dto.address ?? employee.address;

    if (dto.isWorking !== undefined) {
      employee.isWorking = typeof dto.isWorking === 'boolean' ? (dto.isWorking ? 1 : 0) : Number(dto.isWorking);
    }

    await this.employeeRepository.save(employee);
    return { message: SUCCESS_MESSAGES.UPDATE_SUCCESS };
  }

  async deleteEmployee(id: number) {
    const employee = await this.employeeRepository.findOne({ where: { employeeId: id } });
    if (!employee) throw new NotFoundException('Không tìm thấy nhân viên');

    // Chú ý: Cần kiểm tra ràng buộc EmployeeID trong bảng Orders trước khi xóa
    try {
      await this.employeeRepository.delete({ employeeId: id });
      return { message: SUCCESS_MESSAGES.DELETE_SUCCESS };
    } catch (e) {
      throw new BadRequestException('Không thể xóa nhân viên này vì đã có dữ liệu đơn hàng liên quan (thay vào đó hãy đặt trạng thái ngừng làm việc)');
    }
  }

  async changeRole(id: number, dto: ChangeEmployeeRoleDto) {
    const employee = await this.employeeRepository.findOne({ where: { employeeId: id } });
    if (!employee) throw new NotFoundException('Không tìm thấy nhân viên');

    const roleNames = dto.roleNames;

    if (roleNames !== 'employee' && roleNames !== 'employee,admin') {
      throw new ForbiddenException('Bạn không có quyền sử dụng role này');
    }

    employee.roleNames = roleNames;
    await this.employeeRepository.save(employee);

    return { message: SUCCESS_MESSAGES.UPDATE_SUCCESS };
  }

  async changePassword(id: number, dto: ResetEmployeePasswordDto) {
    const employee = await this.employeeRepository.findOne({ where: { employeeId: id } });
    if (!employee) throw new NotFoundException('Không tìm thấy nhân viên');

    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException('Mật khẩu xác nhận không khớp');
    }

    employee.password = HashUtil.hashPassword(dto.newPassword);
    await this.employeeRepository.save(employee);

    return { message: SUCCESS_MESSAGES.UPDATE_SUCCESS };
  }
}


