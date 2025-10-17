import {inject, injectable} from "tsyringe";

import extractErrorDatasource from "@/core/helpers/extract-error-datasource";
import {BankNetwork} from "@/features/bank/data/datasource/bank.network";
import {BankModel} from "@/features/bank/data/model/bank.model";

export interface IBankDatasource {
    getBankById(id: number): Promise<BankModel>;
    getBanks(): Promise<BankModel[]>;
}

@injectable()
export class BankDataSource implements IBankDatasource{

    constructor(
        @inject(BankNetwork) private readonly bankNetwork: BankNetwork
    ) {
    }

    async getBankById(id: number): Promise<BankModel> {
        try {
            const response = await this.bankNetwork.getBankById(id);
            return BankModel.fromJSON(response);
        } catch (error) {
            throw extractErrorDatasource(error, 'BankDataSource:getBankById');
        }
    }

    async getBanks(): Promise<BankModel[]> {
        try {
            const response = await this.bankNetwork.getBanks();
            return response.map((bank: BankModel) => BankModel.fromJSON(bank));
        } catch (error) {
            throw extractErrorDatasource(error, 'BankDataSource:getBanks');
        }
    }
}