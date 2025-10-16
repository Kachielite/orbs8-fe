import {Either} from 'fp-ts/lib/Either';
import {inject, injectable} from 'tsyringe';

import {Failure} from '@/core/errors/failure.error';
import {UseCase} from '@/core/use-case';
import {TransactionsEntity} from '@/features/transactions/domain/entity/transactions.entity';
import {type ITransactionRepository} from '@/features/transactions/domain/repository/transactions.repository';

export class GetTransactionByIdParam {
  constructor(public readonly id: number) {}
}

@injectable()
export class GetTransactionById
  implements UseCase<TransactionsEntity, GetTransactionByIdParam>
{
  constructor(
    @inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async execute(
    params: GetTransactionByIdParam
  ): Promise<Either<Failure, TransactionsEntity>> {
    return await this.transactionRepository.getTransactionById(params.id);
  }
}
