import {Either} from 'fp-ts/lib/Either';
import {inject, injectable} from 'tsyringe';

import {Failure} from '@/core/errors/failure.error';
import {UseCase} from '@/core/use-case';
import {AccountEntity} from '@/features/accounts/domain/entity/accounts.entity';
import {type IAccountsRepository} from '@/features/accounts/domain/repository/accounts.repository';

export class GetAccountByIdParam {
  constructor(public readonly id: number) {}
}

@injectable()
export class GetAccountById implements UseCase<AccountEntity, GetAccountByIdParam> {
  constructor(
    @inject('IAccountsRepository')
    private readonly accountsRepository: IAccountsRepository
  ) {}

  async execute(
    params: GetAccountByIdParam
  ): Promise<Either<Failure, AccountEntity>> {
    return await this.accountsRepository.getAccountById(params.id);
  }
}
