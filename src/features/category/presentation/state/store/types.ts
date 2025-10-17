import {CategoryEntity} from "@/features/category/domain/entity/category.entity";

export type CategorySlice = {
    // state
    categories: CategoryEntity[] | null;
    category: CategoryEntity | null;
    // actions
    setCategories: (categories: CategoryEntity[] | null) => void;
    setCategory: (category: CategoryEntity | null) => void;
}