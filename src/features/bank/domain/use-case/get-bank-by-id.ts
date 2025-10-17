import {Either} from 'fp-ts/lib/Either';
import {inject, injectable} from 'tsyringe';

import {Failure} from '@/core/errors/failure.error';
import {UseCase} from '@/core/use-case';
import {BankEntity} from '@/features/bank/domain/entity/bank.entity';
import {type IBankRepository} from '@/features/bank/domain/repository/bank.repository';

export class GetBankByIdParam {
  constructor(public readonly id: number) {}
}

@injectable()
export class GetBankById
  implements UseCase<BankEntity, GetBankByIdParam>
{
  constructor(
    @inject('IBankRepository')
    private readonly bankRepository: IBankRepository
  ) {}

  async execute(
    params: GetBankByIdParam
  ): Promise<Either<Failure, BankEntity>> {
    return await this.bankRepository.getBankById(params.id);
  }
}
