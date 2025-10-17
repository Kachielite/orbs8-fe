import {fold} from 'fp-ts/Either';

import {Failure} from '@/core/errors/failure.error';
import {getCategoryUseCases} from '@/core/init-dependencies/category.dependency';
import {NoParams} from '@/core/use-case';
import {CategoryEntity} from '@/features/category/domain/entity/category.entity';
import {GetCategoryByIdParam} from '@/features/category/domain/use-case/get-category-by-id';

export const getCategoryByIdEffect = async (id: number) => {
  const response = await getCategoryUseCases().getCategoryById.execute(
    new GetCategoryByIdParam(id)
  );

  return fold<Failure, CategoryEntity, CategoryEntity>(
    failure => {
      throw failure;
    },
    category => {
      return category;
    }
  )(response);
};

export const getCategoriesEffect = async () => {
  const response = await getCategoryUseCases().getCategories.execute(
    new NoParams()
  );

  return fold<Failure, CategoryEntity[], CategoryEntity[]>(
    failure => {
      throw failure;
    },
    categories => {
      return categories;
    }
  )(response);
};
