import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../common/entities/product.entity';
import { Category } from '../../common/entities/category.entity';
import { Supplier } from '../../common/entities/supplier.entity';
import { ProductAttribute } from '../../common/entities/product-attribute.entity';
import { ProductPhoto } from '../../common/entities/product-photo.entity';
import { OrderDetail } from '../../common/entities/order-detail.entity';
import { AdminProductQueryDto } from './dto/product-query.dto';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';

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
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) { }

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

    const [items, total] = await qb.getManyAndCount();

    return {
      items,
      total,
      page,
      limit,
    };
  }

  async getProductDetail(productId: number) {
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
      where: { productId },
      order: { displayOrder: 'ASC' },
    });

    return {
      ...product,
      isSelling: product.isSelling === 1,
      attributes,
      photos,
    };
  }

  async createProduct(dto: CreateProductDto) {
    if (dto.categoryId) {
      const cat = await this.categoryRepository.findOne({ where: { categoryId: dto.categoryId } });
      if (!cat) throw new NotFoundException('Không tìm thấy danh mục');
    }
    if (dto.supplierId) {
      const sup = await this.supplierRepository.findOne({ where: { supplierId: dto.supplierId } });
      if (!sup) throw new NotFoundException('Không tìm thấy nhà cung cấp');
    }

    const product = this.productRepository.create(dto);
    await this.productRepository.save(product);
    return { message: 'Tạo sản phẩm thành công', productId: product.productId };
  }

  async updateProduct(productId: number, dto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { productId } });
    if (!product) throw new NotFoundException('Không tìm thấy sản phẩm');

    Object.assign(product, dto);
    await this.productRepository.save(product);
    return { message: 'Cập nhật sản phẩm thành công' };
  }

  async deleteProduct(productId: number) {
    const product = await this.productRepository.findOne({ where: { productId } });
    if (!product) throw new NotFoundException('Không tìm thấy sản phẩm');

    // Kiểm tra ràng buộc
    const hasOrders = await this.orderDetailRepository.findOne({ where: { productId } });
    if (hasOrders) {
      throw new BadRequestException('Không thể xóa sản phẩm đã có trong các đơn hàng');
    }

    await this.productRepository.delete(productId);
    return { message: 'Xóa sản phẩm thành công' };
  }

  async getProductAttributesByProductId(productId: number) {
    const attributes = await this.productAttributeRepository.find({
      where: { productId },
      order: { displayOrder: 'ASC' },
    });

    return { productId, attributes };
  }
}
