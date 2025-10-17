import {CategoryEntity} from '@/features/category/domain/entity/category.entity';
import {CategorySlice} from '@/features/category/presentation/state/store/types';

import type {StateCreator} from 'zustand/vanilla';

export const createCategoryActions: StateCreator<
  CategorySlice,
  [],
  [],
  Pick<CategorySlice, 'setCategories' | 'setCategory'>
> = set => ({
  setCategories: (categories: CategoryEntity[] | null) => set({ categories }),
  setCategory: (category: CategoryEntity | null) => set({ category }),
});
