import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Category } from '../../common/entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class AdminCategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async list(query?: { search?: string }) {
    const search = query?.search?.trim();

    const where = search
      ? {
          categoryName: Like(`%${search}%`),
        }
      : {};

    return this.categoryRepository.find({
      where: where as any,
      order: { categoryName: 'ASC' },
    });
  }

  async create(dto: CreateCategoryDto) {
    const category = this.categoryRepository.create(dto);
    return this.categoryRepository.save(category);
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({ where: { categoryId: id } });
    if (!category) throw new NotFoundException('Không tìm thấy danh mục');

    Object.assign(category, dto);
    return this.categoryRepository.save(category);
  }

  async delete(id: number) {
    const result = await this.categoryRepository.delete({ categoryId: id });
    if (!result.affected) throw new NotFoundException('Không tìm thấy danh mục');
    return { deleted: true };
  }
}

