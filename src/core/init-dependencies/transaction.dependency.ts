import { container } from 'tsyringe';

import {
  ITransactionDatasource,
  TransactionDataSource,
} from '@/features/transactions/data/datasource/transaction.datasource';
import { TransactionNetwork } from '@/features/transactions/data/datasource/transaction.network';
import { TransactionsRepository } from '@/features/transactions/data/repository/transactions.repository';
import { ITransactionRepository } from '@/features/transactions/domain/repository/transactions.repository';
import { GetTransactionById } from '@/features/transactions/domain/use-case/get-transaction-by-id';
import { GetTransactionSummary } from '@/features/transactions/domain/use-case/get-transaction-summary';
import { GetTransactions } from '@/features/transactions/domain/use-case/get-transactions';
import { UpdateTransaction } from '@/features/transactions/domain/use-case/update-transaction';

export function configureTransactionsContainer() {
  // Register network/data layer dependency
  container.registerSingleton<TransactionNetwork>(TransactionNetwork);
  container.register<ITransactionDatasource>('ITransactionDatasource', {
    useClass: TransactionDataSource,
  });

  // Register domain layer dependency
  container.register<ITransactionRepository>('ITransactionRepository', {
    useClass: TransactionsRepository,
  });
  container.registerSingleton<GetTransactionById>(GetTransactionById);
  container.registerSingleton<GetTransactionSummary>(GetTransactionSummary);
  container.registerSingleton<GetTransactions>(GetTransactions);
  container.registerSingleton<UpdateTransaction>(UpdateTransaction);
}

export function getTransactionsUseCases() {
  return {
    getTransactionById: container.resolve(GetTransactionById),
    getTransactionSummary: container.resolve(GetTransactionSummary),
    getTransactions: container.resolve(GetTransactions),
    updateTransaction: container.resolve(UpdateTransaction),
  };
}
