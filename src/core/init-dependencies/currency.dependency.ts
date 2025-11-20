import {container} from 'tsyringe';

import {CurrencyDataSource, ICurrencyDataSource,} from '@/features/currency/data/datasource/currency.datasource';
import {CurrencyNetwork} from '@/features/currency/data/datasource/currency.network';
import {CurrencyRepository} from '@/features/currency/data/repository/currency.repository';
import {ICurrencyRepository} from '@/features/currency/domain/repository/currency.repository';
import {GetCurrenciesUseCase} from '@/features/currency/domain/use-case/get-currencies';

export function configureCurrencyContainer() {
    // Register network/data layer dependency
    container.registerSingleton<CurrencyNetwork>(CurrencyNetwork);
    container.register<ICurrencyDataSource>('ICurrencyDataSource', {
        useClass: CurrencyDataSource,
    });

    // Register domain layer dependency
    container.register<ICurrencyRepository>('ICurrencyRepository', {
        useClass: CurrencyRepository,
    });
    container.registerSingleton<GetCurrenciesUseCase>(GetCurrenciesUseCase);
}

export function getCurrencyUseCases() {
    return {
        getCurrencies: container.resolve(GetCurrenciesUseCase),
    };
}
