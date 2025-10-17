import {StateCreator} from 'zustand/vanilla';

import {createCategoryActions} from '@/features/category/presentation/state/store/actions';
import {initialCategoryState} from '@/features/category/presentation/state/store/state';
import {CategorySlice} from '@/features/category/presentation/state/store/types';

export const createCategorySlice: StateCreator<CategorySlice> = (
  set,
  get,
  store
) => {
  const actions = createCategoryActions(set, get, store);
  return {
    ...initialCategoryState,
    ...actions,
  };
};
