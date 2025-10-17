import {inject, injectable} from "tsyringe";

import {BASE_URL} from "@/core/constants/env.constants";
import extractErrorNetwork from "@/core/helpers/extract-error-network";
import CustomAxios from "@/core/network/custom-axios";

@injectable()
export class BankNetwork {
    private readonly bankPath =`${BASE_URL}/bank`;

    constructor(@inject('AxiosClient') private readonly axios: CustomAxios) {}

    async getBanks() {
        try {
            const response = await this.axios.getInstance().get(this.bankPath);
            return response.data;
        } catch (error) {
            throw extractErrorNetwork(error, 'BankNetwork:getBanks');
        }
    }

    async getBankById(id: number) {
        try {
            const response = await this.axios.getInstance().get(`${this.bankPath}/${id}`);
            return response.data;
        } catch (error) {
            throw extractErrorNetwork(error, 'BankNetwork:getBankById');
        }
    }

}