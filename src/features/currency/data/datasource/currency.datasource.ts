import {injectable} from "tsyringe";

import extractErrorDatasource from "@/core/helpers/extract-error-datasource";
import {CurrencyNetwork} from "@/features/currency/data/datasource/currency.network";
import {CurrencyModel} from "@/features/currency/data/model/currency.model";

export interface ICurrencyDataSource {
    getCurrencies(): Promise<CurrencyModel[]>;
}


@injectable()
export class CurrencyDataSource {
    constructor(private readonly currencyNetwork: CurrencyNetwork) {
    }

    async getCurrencies(): Promise<CurrencyModel> {
        try {
            const response = await this.currencyNetwork.getCurrencies();
            return response.map((currency: CurrencyModel) => CurrencyModel.fromJSON(currency));
        } catch (error) {
            throw extractErrorDatasource(error, 'CurrencyDataSource:getCurrency');
        }
    }
}