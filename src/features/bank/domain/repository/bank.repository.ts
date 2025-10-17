import { Either } from 'fp-ts/Either';

import { Failure } from '@/core/errors/failure.error';
import { BankEntity } from '@/features/bank/domain/entity/bank.entity';

export interface IBankRepository {
  getBankById(id: number): Promise<Either<Failure, BankEntity>>;
  getBanks(): Promise<Either<Failure, BankEntity[]>>;
}
