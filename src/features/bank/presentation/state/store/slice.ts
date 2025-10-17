import { StateCreator } from 'zustand/vanilla';

import { createBankActions } from '@/features/bank/presentation/state/store/actions';
import { initialBankState } from '@/features/bank/presentation/state/store/state';
import { BankSlice } from '@/features/bank/presentation/state/store/types';

export const createBankSlice: StateCreator<BankSlice> = (set, get, store) => {
  const actions = createBankActions(set, get, store);
  return {
    ...initialBankState,
    ...actions,
  };
};
