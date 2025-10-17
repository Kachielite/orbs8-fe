import { StateCreator } from 'zustand/vanilla';

import { createTransactionActions } from '@/features/transactions/presentation/state/store/actions';
import { initialTransactionState } from '@/features/transactions/presentation/state/store/state';
import { TransactionSlice } from '@/features/transactions/presentation/state/store/types';

export const createTransactionSlice: StateCreator<TransactionSlice> = (
  set,
  get,
  store
) => {
  const actions = createTransactionActions(set, get, store);
  return {
    ...initialTransactionState,
    ...actions,
  };
};
