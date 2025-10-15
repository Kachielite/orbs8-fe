import {StateCreator} from 'zustand/vanilla';

import {createAccountsActions} from '@/features/accounts/presentation/state/store/actions';
import {initialAccountsState} from '@/features/accounts/presentation/state/store/state';
import {AccountsSlice} from '@/features/accounts/presentation/state/store/types';

export const createAccountsSlice: StateCreator<AccountsSlice> = (
  set,
  get,
  store
) => {
  const actions = createAccountsActions(set, get, store);
  return {
    ...initialAccountsState,
    ...actions,
  };
};
