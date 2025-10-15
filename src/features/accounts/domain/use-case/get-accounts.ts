import { Either } from 'fp-ts/lib/Either';
import { inject, injectable } from 'tsyringe';

import { Failure } from '@/core/errors/failure.error';
import { NoParams, UseCase } from '@/core/use-case';
import { AccountEntity } from '@/features/accounts/domain/entity/accounts.entity';
import { type IAccountsRepository } from '@/features/accounts/domain/repository/accounts.repository';

@injectable()
export class GetAccounts implements UseCase<AccountEntity[], NoParams> {
  constructor(
    @inject('IAccountsRepository')
    private readonly accountsRepository: IAccountsRepository
  ) {}

  async execute(_params: NoParams): Promise<Either<Failure, AccountEntity[]>> {
    return await this.accountsRepository.getAccounts();
  }
}
