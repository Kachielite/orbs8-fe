import {Either} from 'fp-ts/Either';

import {Failure} from '@/core/errors/failure.error';
import {CategoryEntity} from '@/features/category/domain/entity/category.entity';

export interface ICategoryRepository {
  getCategories(): Promise<Either<Failure, CategoryEntity[]>>;
  getCategoryById(id: number): Promise<Either<Failure, CategoryEntity>>;
}