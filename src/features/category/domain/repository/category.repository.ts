import {CategoryEntity} from "@/features/category/domain/entity/category.entity";

export interface ICategoryRepository {
    getCategories(): Promise<CategoryEntity[]>;
    getCategoryById(id: number): Promise<CategoryEntity>;
}