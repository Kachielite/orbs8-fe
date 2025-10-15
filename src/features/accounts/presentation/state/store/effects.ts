import {fold} from 'fp-ts/Either';

import {Failure} from '@/core/errors/failure.error';
import {getAccountsUseCases} from '@/core/init-dependencies/accounts.dependency';
import {NoParams} from '@/core/use-case';
import {AccountEntity, AccountSummaryEntity} from '@/features/accounts/domain/entity/accounts.entity';
import {GetAccountByIdParam} from '@/features/accounts/domain/use-case/get-account-by-id';

export const getAccountByIdEffect = async (id: number) => {
  const response = await getAccountsUseCases().getAccountById.execute(
    new GetAccountByIdParam(id)
  );

  return fold<Failure, AccountEntity, AccountEntity>(
    failure => {
      throw failure;
    },
    account => {
      return account;
    }
  )(response);
};

export const getAccountsEffect = async () => {
  const response = await getAccountsUseCases().getAccounts.execute(
    new NoParams()
  );

  return fold<Failure, AccountEntity[], AccountEntity[]>(
    failure => {
      throw failure;
    },
    accounts => {
      return accounts;
    }
  )(response);
};

export const getAccountSummaryEffect = async () => {
  const response = await getAccountsUseCases().getAccountSummary.execute(
    new NoParams()
  );

  return fold<Failure, AccountSummaryEntity, AccountSummaryEntity>(
    failure => {
      throw failure;
    },
    accountSummary => {
      return accountSummary;
    }
  )(response);
};
