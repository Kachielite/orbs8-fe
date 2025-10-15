import { Either, right } from 'fp-ts/lib/Either';
import { inject, injectable } from 'tsyringe';

import { Failure } from '@/core/errors/failure.error';
import extractErrorRepository from '@/core/helpers/extract-error-respository';
import { type IAccountsDataSource } from '@/features/accounts/data/datasource/accounts.datasource';
import {
  AccountEntity,
  AccountSummaryEntity,
} from '@/features/accounts/domain/entity/accounts.entity';
import { IAccountsRepository } from '@/features/accounts/domain/repository/accounts.repository';

@injectable()
export class AccountsRepository implements IAccountsRepository {
  constructor(
    @inject('IAccountsDataSource')
    private readonly accountsDataSource: IAccountsDataSource
  ) {}

  async getAccountById(id: number): Promise<Either<Failure, AccountEntity>> {
    try {
      const response = await this.accountsDataSource.getAccountById(id);
      return right(response);
    } catch (error) {
      throw extractErrorRepository(error, 'AccountsRepository:getAccountById');
    }
  }

  async getAccounts(): Promise<Either<Failure, AccountEntity[]>> {
    try {
      const response = await this.accountsDataSource.getAccounts();
      return right(response);
    } catch (error) {
      throw extractErrorRepository(error, 'AccountsRepository:getAccounts');
    }
  }

  async getAccountSummary(): Promise<Either<Failure, AccountSummaryEntity>> {
    try {
      const response = await this.accountsDataSource.getAccountSummary();
      return right(response);
    } catch (error) {
      throw extractErrorRepository(
        error,
        'AccountsRepository:getAccountSummary'
      );
    }
  }
}
