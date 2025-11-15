import {StateCreator} from "zustand/vanilla";

import {CurrencyEntity} from "@/features/currency/domain/entity/currency.entity";
import {CurrencySlice} from "@/features/currency/presentation/state/store/types";

export const createCurrencyActions: StateCreator<
    CurrencySlice,
    [],
    [],
    Pick<CurrencySlice, 'setCurrencies'>
> = set => ({
    setCurrencies: (currencies: CurrencyEntity[] | null) =>
        set({currencies}),
});