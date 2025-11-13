import axios from "axios";
import {injectable} from "tsyringe";

import {BASE_URL} from "@/core/constants/env.constants";
import extractErrorNetwork from "@/core/helpers/extract-error-network";

@injectable()
export class CurrencyNetwork {
    private readonly currencyPath = `${BASE_URL}/currency`;

    public async getCurrencies() {
        try {
            const response = await axios.get(this.currencyPath);
            return response.data;
        } catch (error) {
            throw extractErrorNetwork(error, 'CurrencyNetwork:getCurrencies');
        }
    }
}