import { Either } from 'fp-ts/lib/Either';
import { inject, injectable } from 'tsyringe';

import { Failure } from '@/core/errors/failure.error';
import { NoParams, UseCase } from '@/core/use-case';
import { BankEntity } from '@/features/bank/domain/entity/bank.entity';
import { type IBankRepository } from '@/features/bank/domain/repository/bank.repository';

@injectable()
export class GetBanks implements UseCase<BankEntity[], NoParams> {
  constructor(
    @inject('IBankRepository')
    private readonly bankRepository: IBankRepository
  ) {}

  async execute(_params: NoParams): Promise<Either<Failure, BankEntity[]>> {
    return await this.bankRepository.getBanks();
  }
}
