import { Either, right } from 'fp-ts/lib/Either';
import { inject, injectable } from 'tsyringe';

import { Failure } from '@/core/errors/failure.error';
import extractErrorRepository from '@/core/helpers/extract-error-respository';
import { type ICategoryDataSource } from '@/features/category/data/datasource/category.datasource';
import { CategoryEntity } from '@/features/category/domain/entity/category.entity';
import { ICategoryRepository } from '@/features/category/domain/repository/category.repository';

@injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @inject('ICategoryDataSource')
    private readonly categoryDataSource: ICategoryDataSource
  ) {}

  async getCategories(): Promise<Either<Failure, CategoryEntity[]>> {
    try {
      const response = await this.categoryDataSource.getCategories();
      return right(response);
    } catch (error) {
      throw extractErrorRepository(error, 'CategoryRepository:getCategories');
    }
  }

  async getCategoryById(id: number): Promise<Either<Failure, CategoryEntity>> {
    try {
      const response = await this.categoryDataSource.getCategoryById(id);
      return right(response);
    } catch (error) {
      throw extractErrorRepository(error, 'CategoryRepository:getCategoryById');
    }
  }
}
