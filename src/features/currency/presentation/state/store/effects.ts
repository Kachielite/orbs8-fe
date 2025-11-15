import {fold} from "fp-ts/Either";

import {Failure} from "@/core/errors/failure.error";
import {getCurrencyUseCases} from "@/core/init-dependencies/currency.dependency";
import {NoParams} from "@/core/use-case";
import {CurrencyEntity} from "@/features/currency/domain/entity/currency.entity";

export const getCurrenciesEffect = async () => {
    const response = await getCurrencyUseCases().getCurrencies.execute(
        new NoParams()
    );

    return fold<Failure, CurrencyEntity[], CurrencyEntity[]>(
        failure => {
            throw failure;
        },
        result => {
            return result;
        }
    )(response);
}