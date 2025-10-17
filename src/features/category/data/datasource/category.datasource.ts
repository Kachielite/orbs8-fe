import { inject, injectable } from 'tsyringe';

import extractErrorDatasource from '@/core/helpers/extract-error-datasource';
import { CategoryNetwork } from '@/features/category/data/datasource/category.network';
import { CategoryModel } from '@/features/category/data/model/category.model';

export interface ICategoryDataSource {
  getCategories(): Promise<CategoryModel[]>;
  getCategoryById(id: number): Promise<CategoryModel>;
}

@injectable()
export class CategoryDataSource implements ICategoryDataSource {
  constructor(
    @inject(CategoryNetwork) private readonly categoryNetwork: CategoryNetwork
  ) {}

  async getCategories(): Promise<CategoryModel[]> {
    try {
      const response = await this.categoryNetwork.getCategories();
      return response.map((category: CategoryModel) =>
        CategoryModel.fromJSON(category)
      );
    } catch (error) {
      throw extractErrorDatasource(error, 'CategoryDataSource:getCategories');
    }
  }

  async getCategoryById(id: number): Promise<CategoryModel> {
    try {
      const response = await this.categoryNetwork.getCategoryById(id);
      return CategoryModel.fromJSON(response);
    } catch (error) {
      throw extractErrorDatasource(error, 'CategoryDataSource:getCategoryById');
    }
  }
}
