import { AccountSummaryEntity } from '@/features/accounts/domain/entity/accounts.entity';
import { DashboardSlice } from '@/features/dashboard/presentation/state/store/types';
import {
  TransactionsEntity,
  TransactionsSummaryEntity,
} from '@/features/transactions/domain/entity/transactions.entity';

import type { StateCreator } from 'zustand/vanilla';

export const createDashboardActions: StateCreator<
  DashboardSlice,
  [],
  [],
  Pick<
    DashboardSlice,
    | 'setDashboardTransactionsSummary'
    | 'setDashboardAccountsSummary'
    | 'setDashboardRecentTransactions'
    | 'setDashboardTransactionsByTypes'
    | 'setDashboardSpendingByBanks'
    | 'setDashboardStartDate'
    | 'setDashboardEndDate'
  >
> = set => ({
  setDashboardTransactionsSummary: (
    summary: TransactionsSummaryEntity | null
  ) => set({ dashboardTransactionsSummary: summary }),

  setDashboardAccountsSummary: (summary: AccountSummaryEntity | null) =>
    set({ dashboardAccountsSummary: summary }),

  setDashboardRecentTransactions: (transactions: TransactionsEntity[] | null) =>
    set({ dashboardRecentTransactions: transactions }),

  setDashboardTransactionsByTypes: (
    transactions: {
      credit: TransactionsEntity[];
      debit: TransactionsEntity[];
    } | null
  ) => set({ dashboardTransactionsByTypes: transactions }),

  setDashboardSpendingByBanks: (
    transactions:
      | { bankName: string; transactions: TransactionsEntity[] }[]
      | null
  ) => set({ dashboardSpendingByBanks: transactions }),

  setDashboardStartDate: (startDate: string) =>
    set({ dashboardStartDate: startDate }),

  setDashboardEndDate: (endDate: string) => set({ dashboardEndDate: endDate }),
});
