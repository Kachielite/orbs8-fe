import { StateCreator } from 'zustand/vanilla';

import { createDashboardActions } from '@/features/dashboard/presentation/state/store/actions';
import { initialDashboardState } from '@/features/dashboard/presentation/state/store/state';
import { DashboardSlice } from '@/features/dashboard/presentation/state/store/types';

export const createDashboardSlice: StateCreator<DashboardSlice> = (
  set,
  get,
  store
) => {
  const actions = createDashboardActions(set, get, store);
  return {
    ...initialDashboardState,
    ...actions,
  };
};
