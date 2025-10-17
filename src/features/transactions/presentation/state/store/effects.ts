import { fold } from 'fp-ts/Either';

import { Failure } from '@/core/errors/failure.error';
import { getTransactionsUseCases } from '@/core/init-dependencies/transaction.dependency';
import { Pagination } from '@/core/interfaces/pagination.interface';
import {
  ITransactionQuery,
  IUpdateTransactionQuery,
} from '@/features/transactions/domain/entity/interface/transactions.interface';
import {
  TransactionsEntity,
  TransactionsSummaryEntity,
} from '@/features/transactions/domain/entity/transactions.entity';
import { GetTransactionByIdParam } from '@/features/transactions/domain/use-case/get-transaction-by-id';
import { GetTransactionSummaryParam } from '@/features/transactions/domain/use-case/get-transaction-summary';
import { GetTransactionsParam } from '@/features/transactions/domain/use-case/get-transactions';
import { UpdateTransactionParam } from '@/features/transactions/domain/use-case/update-transaction';

export const getTransactionByIdEffect = async (id: number) => {
  const response = await getTransactionsUseCases().getTransactionById.execute(
    new GetTransactionByIdParam(id)
  );

  return fold<Failure, TransactionsEntity, TransactionsEntity>(
    failure => {
      throw failure;
    },
    transaction => {
      return transaction;
    }
  )(response);
};

export const getTransactionsEffect = async (query: ITransactionQuery) => {
  const response = await getTransactionsUseCases().getTransactions.execute(
    new GetTransactionsParam(query)
  );

  return fold<
    Failure,
    Pagination<TransactionsEntity>,
    Pagination<TransactionsEntity>
  >(
    failure => {
      throw failure;
    },
    transactions => {
      return transactions;
    }
  )(response);
};

export const updateTransactionEffect = async (
  id: number,
  payload: IUpdateTransactionQuery
) => {
  const response = await getTransactionsUseCases().updateTransaction.execute(
    new UpdateTransactionParam(id, payload)
  );

  return fold<Failure, string, string>(
    failure => {
      throw failure;
    },
    result => {
      return result;
    }
  )(response);
};

export const getTransactionSummaryEffect = async (query: ITransactionQuery) => {
  const response =
    await getTransactionsUseCases().getTransactionSummary.execute(
      new GetTransactionSummaryParam(query)
    );

  return fold<Failure, TransactionsSummaryEntity, TransactionsSummaryEntity>(
    failure => {
      throw failure;
    },
    transactionSummary => {
      return transactionSummary;
    }
  )(response);
};
