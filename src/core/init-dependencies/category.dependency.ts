import { container } from 'tsyringe';

import {
  CategoryDataSource,
  ICategoryDataSource,
} from '@/features/category/data/datasource/category.datasource';
import { CategoryNetwork } from '@/features/category/data/datasource/category.network';
import { CategoryRepository } from '@/features/category/data/repository/category.repository';
import { ICategoryRepository } from '@/features/category/domain/repository/category.repository';
import { GetCategories } from '@/features/category/domain/use-case/get-categories';
import { GetCategoryById } from '@/features/category/domain/use-case/get-category-by-id';

export function configureCategoryContainer() {
  // Register network/data layer dependency
  container.registerSingleton<CategoryNetwork>(CategoryNetwork);
  container.register<ICategoryDataSource>('ICategoryDataSource', {
    useClass: CategoryDataSource,
  });

  // Register domain layer dependency
  container.register<ICategoryRepository>('ICategoryRepository', {
    useClass: CategoryRepository,
  });
  container.registerSingleton<GetCategories>(GetCategories);
  container.registerSingleton<GetCategoryById>(GetCategoryById);
}

export function getCategoryUseCases() {
  return {
    getCategories: container.resolve(GetCategories),
    getCategoryById: container.resolve(GetCategoryById),
  };
}
