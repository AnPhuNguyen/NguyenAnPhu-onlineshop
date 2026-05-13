import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Supplier } from '../../common/entities/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class AdminSuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async list(query?: { search?: string }) {
    const search = query?.search?.trim();
    const where = search ? { supplierName: Like(`%${search}%`) } : {};
    return this.supplierRepository.find({
      where: where as any,
      order: { supplierName: 'ASC' },
    });
  }

  async create(dto: CreateSupplierDto) {
    const supplier = this.supplierRepository.create(dto);
    return this.supplierRepository.save(supplier);
  }

  async update(id: number, dto: UpdateSupplierDto) {
    const supplier = await this.supplierRepository.findOne({ where: { supplierId: id } });
    if (!supplier) throw new NotFoundException('Không tìm thấy nhà cung cấp');

    Object.assign(supplier, dto);
    return this.supplierRepository.save(supplier);
  }

  async delete(id: number) {
    const result = await this.supplierRepository.delete({ supplierId: id });
    if (!result.affected) throw new NotFoundException('Không tìm thấy nhà cung cấp');
    return { deleted: true };
  }
}

