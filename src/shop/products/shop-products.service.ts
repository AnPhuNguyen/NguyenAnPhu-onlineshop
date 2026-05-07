import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';
import { Product } from '../../common/entities/product.entity';
import { Category } from '../../common/entities/category.entity';
import { Supplier } from '../../common/entities/supplier.entity';
import { ProductAttribute } from '../../common/entities/product-attribute.entity';
import { ProductPhoto } from '../../common/entities/product-photo.entity';
import { ProductSearchDto, ProductDetailDto } from './dto/product.dto';
import { PRODUCT_MESSAGES } from '../../common/constants/messages';

/**
 * Service xử lý logic cho sản phẩm (shop)
 * Cung cấp các phương thức tìm kiếm, lọc sản phẩm cho khách hàng
 */
@Injectable()
export class ShopProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  /**
   * Tìm kiếm và lọc sản phẩm
   * @param searchDto - Thông tin tìm kiếm và lọc
   * @returns Danh sách sản phẩm phân trang
   */
  async searchProducts(searchDto: ProductSearchDto) {
    const { search, categoryId, minPrice, maxPrice, page = 1, limit = 10 } = searchDto;
    
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.supplier', 'supplier')
      .leftJoinAndSelect('product.attributes', 'attributes')
      .leftJoinAndSelect('product.photos', 'photos')
      .where('product.isSelling = :isSelling', { isSelling: 1 });

    // Tìm kiếm theo tên
    if (search) {
      queryBuilder.andWhere('product.productName LIKE :search', { search: `%${search}%` });
    }

    // Lọc theo danh mục
    if (categoryId) {
      queryBuilder.andWhere('product.categoryId = :categoryId', { categoryId });
    }

    // Lọc theo khoảng giá
    if (minPrice !== undefined) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice });
    }
    if (maxPrice !== undefined) {
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    // Sắp xếp theo tên và phân trang
    const skip = (page - 1) * limit;
    const [products, total] = await queryBuilder
      .orderBy('product.productName', 'ASC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      products: products.map(product => this.formatProduct(product)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Lấy chi tiết sản phẩm theo ID
   * @param productId - ID sản phẩm
   * @returns Chi tiết sản phẩm
   */
  async getProductDetail(productId: number): Promise<ProductDetailDto> {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.supplier', 'supplier')
      .leftJoinAndSelect('product.attributes', 'attributes')
      .leftJoinAndSelect('product.photos', 'photos')
      .where('product.productId = :productId', { productId })
      .andWhere('product.isSelling = :isSelling', { isSelling: 1 })
      .getOne();

    if (!product) {
      throw new NotFoundException(PRODUCT_MESSAGES.NOT_FOUND);
    }

    return this.formatProduct(product);
  }

  /**
   * Lấy danh sách danh mục sản phẩm
   * @returns Danh sách các danh mục đang có sản phẩm
   */
  async getCategories() {
    try {
      console.log('Getting categories...');
      
      // Use raw SQL query to avoid TypeORM relation issues
      const query = `
        SELECT DISTINCT c.* 
        FROM Categories c
        INNER JOIN Products p ON c.CategoryID = p.CategoryID
        WHERE p.isSelling = 1
      `;
      
      const categories = await this.categoryRepository.query(query);
      console.log('Categories with products found:', categories.length);
      
      return categories;
    } catch (error) {
      console.error('Error in getCategories:', error);
      throw error;
    }
  }

  /**
   * Format dữ liệu sản phẩm để trả về
   * @param product - Dữ liệu sản phẩm từ database
   * @returns Product đã format
   */
  private formatProduct(product: any): ProductDetailDto {
    return {
      productId: product.productId,
      productName: product.productName,
      productDescription: product.productDescription,
      price: product.price,
      unit: product.unit,
      photo: product.photo,
      isSelling: Boolean(product.isSelling),
      category: product.category ? {
        categoryId: product.category.categoryId,
        categoryName: product.category.categoryName,
      } : null,
      supplier: product.supplier ? {
        supplierId: product.supplier.supplierId,
        supplierName: product.supplier.supplierName,
      } : null,
      attributes: product.attributes || [],
      photos: product.photos || [],
    };
  }
}
