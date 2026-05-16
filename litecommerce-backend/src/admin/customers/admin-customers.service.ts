import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashUtil } from '../../common/utils/hash.util';
import { Customer } from '../../common/entities/customer.entity';
import { CustomerQueryDto } from './dto/customer-query.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ResetCustomerPasswordDto } from './dto/reset-customer-password.dto';

@Injectable()
export class AdminCustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async getCustomers(query: CustomerQueryDto) {
    const { keyword, isLocked, province, page = 1, limit = 10 } = query;

    const where: any = {};
    if (keyword) {
      where.customerName = { ...(where.customerName ?? {}), /* placeholder */ };
    }

    const findWhere: any = {};
    if (keyword) {
      // TypeORM ILike không được import ở đây; dùng kiểu biểu diễn object
      findWhere.customerName = ILike(`%${keyword}%`);
    }
    if (isLocked !== undefined) {
      findWhere.isLocked = Number(isLocked);
    }
    if (province) {
      findWhere.province = province;
    }

    const [items, total] = await this.customerRepository.findAndCount({
      where: findWhere,
      skip: (page - 1) * limit,
      take: limit,
      order: { customerId: 'DESC' },
    } as any);

    return {
      items: items.map((c) => ({
        id: c.customerId,
        customerName: c.customerName,
        contactName: c.contactName,
        province: c.province,
        address: c.address,
        phone: c.phone,
        email: c.email,
        isLocked: Boolean(c.isLocked),
      })),
      total,
      page,
      limit,
    };
  }

  async getCustomerById(id: number) {
    const customer = await this.customerRepository.findOne({ where: { customerId: id } });
    if (!customer) throw new NotFoundException('Không tìm thấy khách hàng');

    return {
      id: customer.customerId,
      customerName: customer.customerName,
      contactName: customer.contactName,
      province: customer.province,
      address: customer.address,
      phone: customer.phone,
      email: customer.email,
      isLocked: Boolean(customer.isLocked),
    };
  }

  async updateCustomer(id: number, dto: UpdateCustomerDto) {
    const customer = await this.customerRepository.findOne({ where: { customerId: id } });
    if (!customer) throw new NotFoundException('Không tìm thấy khách hàng');

    // employee/admin được quyền chỉnh sửa (trừ password)
    customer.customerName = dto.customerName;
    customer.contactName = dto.contactName;
    customer.province = dto.province ?? customer.province;
    customer.address = dto.address ?? customer.address;
    customer.phone = dto.phone ?? customer.phone;

    if (dto.email && dto.email !== customer.email) {
      // tránh đổi email trùng
      const exists = await this.customerRepository.findOne({ where: { email: dto.email } });
      if (exists) throw new ConflictException('Email đã tồn tại');
      customer.email = dto.email;
    }

    if (dto.isLocked !== undefined) {
      customer.isLocked = dto.isLocked;
    }

    await this.customerRepository.save(customer);
    return { message: 'Cập nhật khách hàng thành công' };
  }

  async resetPassword(id: number, dto: ResetCustomerPasswordDto) {
    const customer = await this.customerRepository.findOne({ where: { customerId: id } });
    if (!customer) throw new NotFoundException('Không tìm thấy khách hàng');

    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException('Mật khẩu xác nhận không khớp');
    }

    customer.password = HashUtil.hashPassword(dto.newPassword);
    await this.customerRepository.save(customer);

    return { message: 'Đổi mật khẩu khách hàng thành công' };
  }

  async lockCustomer(id: number, isLocked: number) {
    if (isLocked !== 0 && isLocked !== 1) {
      throw new ForbiddenException('isLocked phải là 0 hoặc 1');
    }
    const customer = await this.customerRepository.findOne({ where: { customerId: id } });
    if (!customer) throw new NotFoundException('Không tìm thấy khách hàng');
    customer.isLocked = isLocked;
    await this.customerRepository.save(customer);
    return { message: 'Cập nhật trạng thái khóa khách hàng thành công' };
  }
}

// helper for ILike for case-insensitive search
function ILike(pattern: string) {
  return { $ilike: pattern } as any;
}
