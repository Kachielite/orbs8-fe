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
  dashboardTransactionsByTypes: {
    credit: TransactionsEntity[];
    debit: TransactionsEntity[];
  } | null;
  dashboardSpendingByBanks:
    | { bankName: string; transactions: TransactionsEntity[] }[]
    | null;
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
    transactions: {
      credit: TransactionsEntity[];
      debit: TransactionsEntity[];
    } | null
  ) => void;
  setDashboardSpendingByBanks: (
    transactions:
      | { bankName: string; transactions: TransactionsEntity[] }[]
      | null
  ) => void;
  setDashboardStartDate: (startDate: string) => void;
  setDashboardEndDate: (endDate: string) => void;
};
