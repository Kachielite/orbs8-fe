import { container } from 'tsyringe';

import {
  AccountDataSource,
  IAccountsDataSource,
} from '@/features/accounts/data/datasource/accounts.datasource';
import { AccountsNetwork } from '@/features/accounts/data/datasource/accounts.network';
import { AccountsRepository } from '@/features/accounts/data/repository/accounts.repository';
import { IAccountsRepository } from '@/features/accounts/domain/repository/accounts.repository';
import { GetAccountById } from '@/features/accounts/domain/use-case/get-account-by-id';
import { GetAccountSummary } from '@/features/accounts/domain/use-case/get-account-summary';
import { GetAccounts } from '@/features/accounts/domain/use-case/get-accounts';

export function configureAccountsContainer() {
  // Register network/data layer dependency
  container.registerSingleton<AccountsNetwork>(AccountsNetwork);
  container.register<IAccountsDataSource>('IAccountsDataSource', {
    useClass: AccountDataSource,
  });

  // Register domain layer dependency
  container.register<IAccountsRepository>('IAccountsRepository', {
    useClass: AccountsRepository,
  });
  container.registerSingleton<GetAccountById>(GetAccountById);
  container.registerSingleton<GetAccountSummary>(GetAccountSummary);
  container.registerSingleton<GetAccounts>(GetAccounts);
}

export function getAccountsUseCases() {
  return {
    getAccountById: container.resolve(GetAccountById),
    getAccountSummary: container.resolve(GetAccountSummary),
    getAccounts: container.resolve(GetAccounts),
  };
}
