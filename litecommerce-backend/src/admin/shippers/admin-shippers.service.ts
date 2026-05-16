import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Shipper } from '../../common/entities/shipper.entity';
import { CreateShipperDto } from './dto/create-shipper.dto';
import { UpdateShipperDto } from './dto/update-shipper.dto';

@Injectable()
export class AdminShippersService {
  constructor(
    @InjectRepository(Shipper)
    private shipperRepository: Repository<Shipper>,
  ) {}

  async list(query?: { search?: string }) {
    const search = query?.search?.trim();
    const where = search ? { shipperName: Like(`%${search}%`) } : {};

    return this.shipperRepository.find({
      where: where as any,
      order: { shipperName: 'ASC' },
    });
  }

  async create(dto: CreateShipperDto) {
    const shipper = this.shipperRepository.create(dto);
    return this.shipperRepository.save(shipper);
  }

  async update(id: number, dto: UpdateShipperDto) {
    const shipper = await this.shipperRepository.findOne({ where: { shipperId: id } });
    if (!shipper) throw new NotFoundException('Không tìm thấy người giao hàng');

    Object.assign(shipper, dto);
    return this.shipperRepository.save(shipper);
  }

  async delete(id: number) {
    const result = await this.shipperRepository.delete({ shipperId: id });
    if (!result.affected) throw new NotFoundException('Không tìm thấy người giao hàng');
    return { deleted: true };
  }
}

