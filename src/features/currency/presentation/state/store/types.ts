import {CurrencyEntity} from '@/features/currency/domain/entity/currency.entity';

export type CurrencySlice = {
    currencies: CurrencyEntity[] | null;
    setCurrencies: (currencies: CurrencyEntity[] | null) => void;
};
