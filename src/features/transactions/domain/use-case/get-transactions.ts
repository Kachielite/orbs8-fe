import {Either} from 'fp-ts/lib/Either';
import {inject, injectable} from 'tsyringe';

import {Failure} from '@/core/errors/failure.error';
import {Pagination} from '@/core/interfaces/pagination.interface';
import {UseCase} from '@/core/use-case';
import {ITransactionQuery} from '@/features/transactions/domain/entity/interface/transactions.interface';
import {TransactionsEntity} from '@/features/transactions/domain/entity/transactions.entity';
import {type ITransactionRepository} from '@/features/transactions/domain/repository/transactions.repository';

export class GetTransactionsParam {
  constructor(public readonly query: ITransactionQuery) {}
}

@injectable()
export class GetTransactions
  implements UseCase<Pagination<TransactionsEntity>, GetTransactionsParam>
{
  constructor(
    @inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async execute(
    params: GetTransactionsParam
  ): Promise<Either<Failure, Pagination<TransactionsEntity>>> {
    return await this.transactionRepository.getTransactions(params.query);
  }
}
