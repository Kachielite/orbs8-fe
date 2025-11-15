import {StateCreator} from "zustand/vanilla";

import {createCurrencyActions} from "@/features/currency/presentation/state/store/actions";
import {initialCurrencyState} from "@/features/currency/presentation/state/store/state";
import {CurrencySlice} from "@/features/currency/presentation/state/store/types";


export const createCurrencySlice: StateCreator<CurrencySlice> = (
    set,
    get,
    store
) => {
    const actions = createCurrencyActions(set, get, store);
    return {
        ...initialCurrencyState,
        ...actions,
    };
}