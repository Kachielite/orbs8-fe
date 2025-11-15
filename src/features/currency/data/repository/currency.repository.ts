import {Either} from 'fp-ts/Either';
import {right} from 'fp-ts/lib/Either';
import {inject, injectable} from 'tsyringe';

import {Failure} from '@/core/errors/failure.error';
import extractErrorRepository from '@/core/helpers/extract-error-respository';
import {type ICurrencyDataSource} from '@/features/currency/data/datasource/currency.datasource';
import {CurrencyEntity} from '@/features/currency/domain/entity/currency.entity';
import {type ICurrencyRepository} from '@/features/currency/domain/repository/currency.repository';

@injectable()
export class CurrencyRepository implements ICurrencyRepository {
    constructor(
        @inject('ICurrencyDataSource')
        private readonly currencyDataSource: ICurrencyDataSource
    ) {
    }

    async getCurrencies(): Promise<Either<Failure, CurrencyEntity[]>> {
        try {
            const response = await this.currencyDataSource.getCurrencies();
            return right(response);
        } catch (error) {
            throw extractErrorRepository(error, 'CurrencyRepository:getCurrencies');
        }
    }
}
