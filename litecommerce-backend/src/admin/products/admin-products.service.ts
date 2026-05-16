import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../common/entities/product.entity';
import { Category } from '../../common/entities/category.entity';
import { Supplier } from '../../common/entities/supplier.entity';
import { ProductAttribute } from '../../common/entities/product-attribute.entity';
import { ProductPhoto } from '../../common/entities/product-photo.entity';
import { AdminProductQueryDto } from './dto/product-query.dto';

@Injectable()
export class AdminProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
    @InjectRepository(ProductAttribute)
    private readonly productAttributeRepository: Repository<ProductAttribute>,
    @InjectRepository(ProductPhoto)
    private readonly productPhotoRepository: Repository<ProductPhoto>,
  ) {}

  async searchProducts(query: AdminProductQueryDto) {
    const {
      search,
      categoryId,
      supplierId,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = query ?? {};

    const qb = this.productRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.category', 'c')
      .leftJoinAndSelect('p.supplier', 's')
      .where('1=1');

    if (search) {
      qb.andWhere('p.productName LIKE :search', { search: `%${search}%` });
    }
    if (typeof categoryId === 'number') {
      qb.andWhere('p.categoryId = :categoryId', { categoryId });
    }
    if (typeof supplierId === 'number') {
      qb.andWhere('p.supplierId = :supplierId', { supplierId });
    }
    if (typeof minPrice === 'number') {
      qb.andWhere('p.price >= :minPrice', { minPrice });
    }
    if (typeof maxPrice === 'number') {
      qb.andWhere('p.price <= :maxPrice', { maxPrice });
    }

    qb.orderBy('p.productId', 'DESC');
    qb.skip((page - 1) * limit);
    qb.take(limit);

    const items = await qb.getMany();

    return {
      items,
      page,
      limit,
    };
  }

  async getProductDetail(productId: number) {
    if (!productId) throw new BadRequestException('productId is required');

    const product = await this.productRepository.findOne({
      where: { productId },
      relations: ['category', 'supplier'],
    });

    if (!product) throw new NotFoundException('Không tìm thấy sản phẩm');

    const attributes = await this.productAttributeRepository.find({
      where: { productId },
      order: { displayOrder: 'ASC' },
    });

    const photos = await this.productPhotoRepository.find({
      where: { productId, isHidden: 0 },
      order: { displayOrder: 'ASC' },
    });

    return {
      productId: product.productId,
      productName: product.productName,
      productDescription: product.productDescription,
      price: product.price,
      unit: product.unit,
      photo: product.photo,
      isSelling: product.isSelling === 1,
      category: product.category,
      supplier: product.supplier,
      attributes: attributes.map((a) => ({
        attributeName: a.attributeName,
        attributeValue: a.attributeValue,
      })),
      photos: photos.map((ph) => ({
        photoId: ph.photoId,
        photo: ph.photo,
      })),
    };
  }

  /**
   * GET /api/admin/products/:id/attributes
   * Lấy danh sách thuộc tính của 1 product (admin)
   */
  async getProductAttributesByProductId(productId: number) {
    if (!productId) throw new BadRequestException('productId is required');

    const attributes = await this.productAttributeRepository.find({
      where: { productId },
      order: { displayOrder: 'ASC' },
    });

    return {
      productId,
      attributes: attributes.map((a) => ({
        attributeId: a.attributeId,
        attributeName: a.attributeName,
        attributeValue: a.attributeValue,
        displayOrder: a.displayOrder,
      })),
    };
  }
}
