import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductAttribute } from '../../common/entities/product-attribute.entity';
import { Product } from '../../common/entities/product.entity';
import { CreateProductAttributeDto } from './dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';

@Injectable()
export class AdminProductAttributesService {
  constructor(
    @InjectRepository(ProductAttribute)
    private readonly productAttributeRepository: Repository<ProductAttribute>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async listByProductId(productId: number) {
    if (!productId) throw new BadRequestException('productId is required');

    return this.productAttributeRepository.find({
      where: { productId },
      order: { displayOrder: 'ASC' },
    });
  }

  async create(dto: CreateProductAttributeDto) {
    const product = await this.productRepository.findOne({ where: { productId: dto.productId } });
    if (!product) throw new NotFoundException('Không tìm thấy sản phẩm');

    const entity = this.productAttributeRepository.create({
      productId: dto.productId,
      attributeName: dto.attributeName,
      attributeValue: dto.attributeValue,
      displayOrder: dto.displayOrder ?? 0,
    });

    return this.productAttributeRepository.save(entity);
  }

  async update(productId: number, attributeId: number, dto: UpdateProductAttributeDto) {
    const existing = await this.productAttributeRepository.findOne({
      where: { attributeId, productId },
    });
    if (!existing) throw new NotFoundException('Không tìm thấy thuộc tính sản phẩm');

    existing.attributeName = dto.attributeName;
    existing.attributeValue = dto.attributeValue;
    existing.displayOrder = dto.displayOrder ?? existing.displayOrder;

    return this.productAttributeRepository.save(existing);
  }

  async delete(productId: number, attributeId: number) {
    const existing = await this.productAttributeRepository.findOne({
      where: { attributeId, productId },
    });
    if (!existing) throw new NotFoundException('Không tìm thấy thuộc tính sản phẩm');

    await this.productAttributeRepository.delete({ attributeId });
    return { message: 'Xóa thành công' };
  }

  /**
   * GET /api/admin/product-attributes
   * Lấy toàn bộ thuộc tính (admin)
   */
  async listAll() {
    return this.productAttributeRepository.find({
      order: { displayOrder: 'ASC' },
    });
  }
}
