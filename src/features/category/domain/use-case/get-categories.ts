import {Either} from 'fp-ts/lib/Either';
import {inject, injectable} from 'tsyringe';

import {Failure} from '@/core/errors/failure.error';
import {NoParams, UseCase} from '@/core/use-case';
import {CategoryEntity} from '@/features/category/domain/entity/category.entity';
import {type ICategoryRepository} from '@/features/category/domain/repository/category.repository';

@injectable()
export class GetCategories implements UseCase<CategoryEntity[], NoParams> {
  constructor(
    @inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository
  ) {}

  async execute(_params: NoParams): Promise<Either<Failure, CategoryEntity[]>> {
    return await this.categoryRepository.getCategories();
  }
}
