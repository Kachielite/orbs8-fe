import {Pagination} from '@/core/interfaces/pagination.interface';
import {
    TransactionsEntity,
    TransactionsSummaryEntity,
} from '@/features/transactions/domain/entity/transactions.entity';
import {TransactionSlice} from '@/features/transactions/presentation/state/store/types';

import type {StateCreator} from 'zustand/vanilla';

export const createTransactionActions: StateCreator<
  TransactionSlice,
  [],
  [],
  Pick<TransactionSlice, 'setTransactions' | 'setTransaction' | 'setTransactionSummary'>
> = set => ({
  setTransactions: (transactions: Pagination<TransactionsEntity> | null) => set({ transactions }),
  setTransaction: (transaction: TransactionsEntity | null) => set({ transaction }),
  setTransactionSummary: (transactionSummary: TransactionsSummaryEntity | null) =>
    set({ transactionSummary }),
});
