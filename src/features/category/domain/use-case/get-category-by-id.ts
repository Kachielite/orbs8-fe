import { Either } from 'fp-ts/lib/Either';
import { inject, injectable } from 'tsyringe';

import { Failure } from '@/core/errors/failure.error';
import { UseCase } from '@/core/use-case';
import { CategoryEntity } from '@/features/category/domain/entity/category.entity';
import { type ICategoryRepository } from '@/features/category/domain/repository/category.repository';

export class GetCategoryByIdParam {
  constructor(public readonly id: number) {}
}

@injectable()
export class GetCategoryById
  implements UseCase<CategoryEntity, GetCategoryByIdParam>
{
  constructor(
    @inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository
  ) {}

  async execute(
    params: GetCategoryByIdParam
  ): Promise<Either<Failure, CategoryEntity>> {
    return await this.categoryRepository.getCategoryById(params.id);
  }
}
