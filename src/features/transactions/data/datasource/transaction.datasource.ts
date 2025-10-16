import {inject, injectable} from "tsyringe";

import extractErrorDatasource from "@/core/helpers/extract-error-datasource";
import {Pagination} from "@/core/interfaces/pagination.interface";
import {TransactionNetwork} from "@/features/transactions/data/datasource/transaction.network";
import {TransactionModel, TransactionSummaryModel} from "@/features/transactions/data/model/transaction.model";
import {
    ITransactionQuery,
    IUpdateTransactionQuery
} from "@/features/transactions/domain/entity/interface/transactions.interface";

export interface ITransactionDatasource {
    getTransactions(query: ITransactionQuery):Promise<Pagination<TransactionModel>>;
    getTransactionById(id: number):Promise<TransactionModel>;
    updateTransaction(id: number, payload: IUpdateTransactionQuery):Promise<string>;
    getTransactionSummary(query: ITransactionQuery):Promise<TransactionSummaryModel>;
}

@injectable()
export class TransactionDataSource implements ITransactionDatasource{
    private readonly transactionNetwork: TransactionNetwork;

    constructor(@inject(TransactionNetwork) transactionNetwork: TransactionNetwork) {
        this.transactionNetwork = transactionNetwork;
    }

    async getTransactions(query: ITransactionQuery): Promise<Pagination<TransactionModel>> {
        try{
            return await this.transactionNetwork.getTransactions(query);
        } catch (error) {
            throw extractErrorDatasource(error, 'TransactionDataSource:getTransactions');
        }
    }

    async getTransactionById(id: number): Promise<TransactionModel> {
        try {
            const response =  await this.transactionNetwork.getTransactionById(id);
            return TransactionModel.fromJSON(response);
        } catch (error) {
            throw extractErrorDatasource(error, 'TransactionDataSource:getTransactionById');
        }
    }

    async updateTransaction(id: number, payload: IUpdateTransactionQuery): Promise<string> {
        try {
            return await this.transactionNetwork.updateTransaction(id, payload);
        } catch (error) {
            throw extractErrorDatasource(error, 'TransactionDataSource:updateTransaction');
        }
    }

    async getTransactionSummary(query: ITransactionQuery): Promise<TransactionSummaryModel> {
        try {
            const response =  await this.transactionNetwork.getTransactionSummary(query);
            return TransactionSummaryModel.fromJSON(response);
        } catch (error) {
            throw extractErrorDatasource(error, 'TransactionDataSource:getTransactionSummary');
        }
    }
}