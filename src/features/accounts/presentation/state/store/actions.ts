import {
  AccountEntity,
  AccountSummaryEntity,
} from '@/features/accounts/domain/entity/accounts.entity';
import { AccountsSlice } from '@/features/accounts/presentation/state/store/types';

import type { StateCreator } from 'zustand/vanilla';

export const createAccountsActions: StateCreator<
  AccountsSlice,
  [],
  [],
  Pick<AccountsSlice, 'setAccounts' | 'setAccount' | 'setAccountSummary'>
> = set => ({
  setAccounts: (accounts: AccountEntity[]) => set({ accounts }),
  setAccount: (account: AccountEntity) => set({ account }),
  setAccountSummary: (accountSummary: AccountSummaryEntity | null) =>
    set({ accountSummary }),
});
