import { Either } from 'fp-ts/lib/Either';
import { inject, injectable } from 'tsyringe';

import { Failure } from '@/core/errors/failure.error';
import { UseCase } from '@/core/use-case';
import { ITransactionQuery } from '@/features/transactions/domain/entity/interface/transactions.interface';
import { TransactionsSummaryEntity } from '@/features/transactions/domain/entity/transactions.entity';
import { type ITransactionRepository } from '@/features/transactions/domain/repository/transactions.repository';

export class GetTransactionSummaryParam {
  constructor(public readonly query: ITransactionQuery) {}
}

@injectable()
export class GetTransactionSummary
  implements UseCase<TransactionsSummaryEntity, GetTransactionSummaryParam>
{
  constructor(
    @inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async execute(
    params: GetTransactionSummaryParam
  ): Promise<Either<Failure, TransactionsSummaryEntity>> {
    return await this.transactionRepository.getTransactionSummary(params.query);
  }
}
