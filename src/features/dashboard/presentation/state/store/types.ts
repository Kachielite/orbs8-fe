import { AccountSummaryEntity } from '@/features/accounts/domain/entity/accounts.entity';
import {
  TransactionsEntity,
  TransactionsSummaryEntity,
} from '@/features/transactions/domain/entity/transactions.entity';

export type DashboardSlice = {
  // states
  dashboardTransactionsSummary: TransactionsSummaryEntity | null;
  dashboardAccountsSummary: AccountSummaryEntity | null;
  dashboardRecentTransactions: TransactionsEntity[] | null;
  dashboardTransactionsByTypes: TransactionsEntity[] | null;
  dashboardSpendingByBanks: TransactionsEntity[] | null;
  dashboardStartDate: string;
  dashboardEndDate: string;
  // setters
  setDashboardTransactionsSummary: (
    summary: TransactionsSummaryEntity | null
  ) => void;
  setDashboardAccountsSummary: (summary: AccountSummaryEntity | null) => void;
  setDashboardRecentTransactions: (
    transactions: TransactionsEntity[] | null
  ) => void;
  setDashboardTransactionsByTypes: (
    transactions: TransactionsEntity[] | null
  ) => void;
  setDashboardSpendingByBanks: (
    transactions: TransactionsEntity[] | null
  ) => void;
  setDashboardStartDate: (startDate: string) => void;
  setDashboardEndDate: (endDate: string) => void;
};
