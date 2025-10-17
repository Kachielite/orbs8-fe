import { container } from 'tsyringe';

import {
  BankDataSource,
  IBankDatasource,
} from '@/features/bank/data/datasource/bank.datasource';
import { BankNetwork } from '@/features/bank/data/datasource/bank.network';
import { BankRepository } from '@/features/bank/data/repository/bank.repository';
import { IBankRepository } from '@/features/bank/domain/repository/bank.repository';
import { GetBankById } from '@/features/bank/domain/use-case/get-bank-by-id';
import { GetBanks } from '@/features/bank/domain/use-case/get-banks';

export function configureBankContainer() {
  // Register network/data layer dependency
  container.registerSingleton<BankNetwork>(BankNetwork);
  container.register<IBankDatasource>('IBankDatasource', {
    useClass: BankDataSource,
  });

  // Register domain layer dependency
  container.register<IBankRepository>('IBankRepository', {
    useClass: BankRepository,
  });
  container.registerSingleton<GetBankById>(GetBankById);
  container.registerSingleton<GetBanks>(GetBanks);
}

export function getBankUseCases() {
  return {
    getBankById: container.resolve(GetBankById),
    getBanks: container.resolve(GetBanks),
  };
}
