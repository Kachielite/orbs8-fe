import { Either, right } from 'fp-ts/lib/Either';
import { inject, injectable } from 'tsyringe';

import { Failure } from '@/core/errors/failure.error';
import extractErrorRepository from '@/core/helpers/extract-error-respository';
import { type IBankDatasource } from '@/features/bank/data/datasource/bank.datasource';
import { BankEntity } from '@/features/bank/domain/entity/bank.entity';
import { IBankRepository } from '@/features/bank/domain/repository/bank.repository';

@injectable()
export class BankRepository implements IBankRepository {
  constructor(
    @inject('IBankDatasource')
    private readonly bankDataSource: IBankDatasource
  ) {}

  async getBankById(id: number): Promise<Either<Failure, BankEntity>> {
    try {
      const response = await this.bankDataSource.getBankById(id);
      return right(response);
    } catch (error) {
      throw extractErrorRepository(error, 'BankRepository:getBankById');
    }
  }

  async getBanks(): Promise<Either<Failure, BankEntity[]>> {
    try {
      const response = await this.bankDataSource.getBanks();
      return right(response);
    } catch (error) {
      throw extractErrorRepository(error, 'BankRepository:getBanks');
    }
  }
}
