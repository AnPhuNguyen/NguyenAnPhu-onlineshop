import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { HashUtil } from '../../common/utils/hash.util';
import { Customer } from '../../common/entities/customer.entity';
import { Province } from '../../common/entities/province.entity';
import { CustomerQueryDto } from './dto/customer-query.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ResetCustomerPasswordDto } from './dto/reset-customer-password.dto';
import { SUCCESS_MESSAGES, CUSTOMER_MESSAGES } from '../../common/constants/messages';

@Injectable()
export class AdminCustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
  ) { }

  async getCustomers(query: CustomerQueryDto) {
    const { keyword, isLocked, province, page = 1, limit = 10 } = query;

    const findWhere: any = {};
    if (keyword) {
      findWhere.customerName = Like(`%${keyword}%`);
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
    });

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
    if (!customer) throw new NotFoundException(CUSTOMER_MESSAGES.NOT_FOUND);

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

  async createCustomer(dto: CreateCustomerDto) {
    const exists = await this.customerRepository.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email đã tồn tại');

    if (dto.province) {
      const p = await this.provinceRepository.findOne({ where: { provinceName: dto.province } });
      if (!p) throw new BadRequestException(`Tỉnh/Thành phố "${dto.province}" không hợp lệ`);
    }

    const customer = new Customer();
    Object.assign(customer, {
      ...dto,
      contactName: dto.contactName || dto.customerName,
      password: HashUtil.hashPassword(dto.password || '123456'), // mặc định pass nếu thiếu
      isLocked: 0,
    });

    await this.customerRepository.save(customer);
    return { message: SUCCESS_MESSAGES.CREATE_SUCCESS, customerId: customer.customerId };
  }

  async updateCustomer(id: number, dto: UpdateCustomerDto) {
    const customer = await this.customerRepository.findOne({ where: { customerId: id } });
    if (!customer) throw new NotFoundException(CUSTOMER_MESSAGES.NOT_FOUND);

    if (dto.province) {
      const p = await this.provinceRepository.findOne({ where: { provinceName: dto.province } });
      if (!p) throw new BadRequestException(`Tỉnh/Thành phố "${dto.province}" không hợp lệ`);
    }

    if (dto.email && dto.email !== customer.email) {
      const exists = await this.customerRepository.findOne({ where: { email: dto.email } });
      if (exists) throw new ConflictException('Email đã tồn tại');
      customer.email = dto.email;
    }

    Object.assign(customer, dto);
    await this.customerRepository.save(customer);
    return { message: SUCCESS_MESSAGES.UPDATE_SUCCESS };
  }

  async deleteCustomer(id: number) {
    const customer = await this.customerRepository.findOne({ where: { customerId: id } });
    if (!customer) throw new NotFoundException(CUSTOMER_MESSAGES.NOT_FOUND);

    // Chú ý: Cần kiểm tra xem khách hàng có đơn hàng không trước khi xóa (ràng buộc FK)
    try {
      await this.customerRepository.delete(id);
      return { message: SUCCESS_MESSAGES.DELETE_SUCCESS };
    } catch (e) {
      throw new BadRequestException('Không thể xóa khách hàng này vì đã có dữ liệu đơn hàng liên quan');
    }
  }

  async resetPassword(id: number, dto: ResetCustomerPasswordDto) {
    const customer = await this.customerRepository.findOne({ where: { customerId: id } });
    if (!customer) throw new NotFoundException(CUSTOMER_MESSAGES.NOT_FOUND);

    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException('Mật khẩu xác nhận không khớp');
    }

    customer.password = HashUtil.hashPassword(dto.newPassword);
    await this.customerRepository.save(customer);

    return { message: SUCCESS_MESSAGES.UPDATE_SUCCESS };
  }
}
