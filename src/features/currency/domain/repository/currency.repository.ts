import {Either} from 'fp-ts/Either';

import {Failure} from '@/core/errors/failure.error';
import {CurrencyEntity} from '@/features/currency/domain/entity/currency.entity';

export interface ICurrencyRepository {
    getCurrencies(): Promise<Either<Failure, CurrencyEntity[]>>;
}
