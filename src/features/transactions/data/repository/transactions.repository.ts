import { Either, right } from 'fp-ts/lib/Either';
import { inject, injectable } from 'tsyringe';

import { Failure } from '@/core/errors/failure.error';
import extractErrorRepository from '@/core/helpers/extract-error-respository';
import { Pagination } from '@/core/interfaces/pagination.interface';
import { type ITransactionDatasource } from '@/features/transactions/data/datasource/transaction.datasource';
import {
  ITransactionQuery,
  IUpdateTransactionQuery,
} from '@/features/transactions/domain/entity/interface/transactions.interface';
import {
  TransactionsEntity,
  TransactionsSummaryEntity,
} from '@/features/transactions/domain/entity/transactions.entity';
import { ITransactionRepository } from '@/features/transactions/domain/repository/transactions.repository';

@injectable()
export class TransactionsRepository implements ITransactionRepository {
  constructor(
    @inject('ITransactionDatasource')
    private readonly transactionDataSource: ITransactionDatasource
  ) {}

  async getTransactions(
    query: ITransactionQuery
  ): Promise<Either<Failure, Pagination<TransactionsEntity>>> {
    try {
      const response = await this.transactionDataSource.getTransactions(query);
      return right(response);
    } catch (error) {
      throw extractErrorRepository(
        error,
        'TransactionsRepository:getTransactions'
      );
    }
  }

  async getTransactionById(
    id: number
  ): Promise<Either<Failure, TransactionsEntity>> {
    try {
      const response = await this.transactionDataSource.getTransactionById(id);
      return right(response);
    } catch (error) {
      throw extractErrorRepository(
        error,
        'TransactionsRepository:getTransactionById'
      );
    }
  }

  async updateTransaction(
    id: number,
    payload: IUpdateTransactionQuery
  ): Promise<Either<Failure, string>> {
    try {
      const response = await this.transactionDataSource.updateTransaction(
        id,
        payload
      );
      return right(response);
    } catch (error) {
      throw extractErrorRepository(
        error,
        'TransactionsRepository:updateTransaction'
      );
    }
  }

  async getTransactionSummary(
    query: ITransactionQuery
  ): Promise<Either<Failure, TransactionsSummaryEntity>> {
    try {
      const response =
        await this.transactionDataSource.getTransactionSummary(query);
      return right(response);
    } catch (error) {
      throw extractErrorRepository(
        error,
        'TransactionsRepository:getTransactionSummary'
      );
    }
  }
}
