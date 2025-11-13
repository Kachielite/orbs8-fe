import {Either} from "fp-ts/Either";
import {injectable} from "tsyringe";

import {Failure} from "@/core/errors/failure.error";
import {NoParams, UseCase} from "@/core/use-case";
import {CurrencyEntity} from "@/features/currency/domain/entity/currency.entity";
import {type ICurrencyRepository} from "@/features/currency/domain/repository/currency.repository";


@injectable()
export class GetCurrenciesUseCase implements UseCase<CurrencyEntity[], NoParams> {
    constructor(
        private readonly currencyRepository: ICurrencyRepository
    ) {
    }

    async execute(_params: NoParams): Promise<Either<Failure, CurrencyEntity[]>> {
        return this.currencyRepository.getCurrencies();
    }
}