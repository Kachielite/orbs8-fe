import { Either } from 'fp-ts/lib/Either';
import { inject, injectable } from 'tsyringe';

import { Failure } from '@/core/errors/failure.error';
import { UseCase } from '@/core/use-case';
import { IUpdateTransactionQuery } from '@/features/transactions/domain/entity/interface/transactions.interface';
import { type ITransactionRepository } from '@/features/transactions/domain/repository/transactions.repository';

export class UpdateTransactionParam {
  constructor(
    public readonly id: number,
    public readonly payload: IUpdateTransactionQuery
  ) {}
}

@injectable()
export class UpdateTransaction
  implements UseCase<string, UpdateTransactionParam>
{
  constructor(
    @inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async execute(
    params: UpdateTransactionParam
  ): Promise<Either<Failure, string>> {
    return await this.transactionRepository.updateTransaction(
      params.id,
      params.payload
    );
  }
}
