import {inject, injectable} from 'tsyringe';

import extractErrorRepository from '@/core/helpers/extract-error-respository';
import {type ICategoryDataSource} from '@/features/category/data/datasource/category.datasource';
import {CategoryEntity} from '@/features/category/domain/entity/category.entity';
import {ICategoryRepository} from '@/features/category/domain/repository/category.repository';

@injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @inject('ICategoryDataSource')
    private readonly categoryDataSource: ICategoryDataSource
  ) {}

  async getCategories(): Promise<CategoryEntity[]> {
    try {
      return await this.categoryDataSource.getCategories();
    } catch (error) {
      throw extractErrorRepository(error, 'CategoryRepository:getCategories');
    }
  }

  async getCategoryById(id: number): Promise<CategoryEntity> {
    try {
      return await this.categoryDataSource.getCategoryById(id);
    } catch (error) {
      throw extractErrorRepository(error, 'CategoryRepository:getCategoryById');
    }
  }
}
