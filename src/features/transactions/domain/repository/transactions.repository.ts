import { Either } from 'fp-ts/Either';

import { Failure } from '@/core/errors/failure.error';
import { Pagination } from '@/core/interfaces/pagination.interface';
import {
  ITransactionQuery,
  IUpdateTransactionQuery,
} from '@/features/transactions/domain/entity/interface/transactions.interface';
import {
  TransactionsEntity,
  TransactionsSummaryEntity,
} from '@/features/transactions/domain/entity/transactions.entity';

export interface ITransactionRepository {
  getTransactions(
    query: ITransactionQuery
  ): Promise<Either<Failure, Pagination<TransactionsEntity>>>;
  getTransactionById(id: number): Promise<Either<Failure, TransactionsEntity>>;
  updateTransaction(
    id: number,
    payload: IUpdateTransactionQuery
  ): Promise<Either<Failure, string>>;
  getTransactionSummary(
    query: ITransactionQuery
  ): Promise<Either<Failure, TransactionsSummaryEntity>>;
}
