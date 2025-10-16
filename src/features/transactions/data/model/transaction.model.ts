import {TransactionType} from "@/features/transactions/domain/entity/enum/transaction-type.enum";
import {
    TopTransactionsEntity,
    TransactionsEntity,
    TransactionsSummaryEntity
} from "@/features/transactions/domain/entity/transactions.entity";

export class TransactionModel extends TransactionsEntity {
    constructor(
        public id: number,
        public amount: number,
        public type: TransactionType,
        public description: string,
        public transactionDate: string,
        public category: string,
        public categoryId: number,
        public account: string,
        public accountId: number,
        public bank: string,
        public bankId: number,
        public createdAt: string,

    ) {
        super(id, amount, type, description, transactionDate, category, categoryId, account, accountId, bank, bankId, createdAt);
    }

    static fromJSON(json: TransactionsEntity): TransactionModel {
        return new TransactionModel(
            json.id,
            json.amount,
            json.type,
            json.description,
            json.transactionDate,
            json.category,
            json.categoryId,
            json.account,
            json.accountId,
            json.bank,
            json.bankId,
            json.createdAt,
        );
    }
}


export class TransactionSummaryModel extends TransactionsSummaryEntity {
    constructor(
         public topSpendByCategory: TopTransactionsEntity[],
        public topSpendByCreditType: TopTransactionsEntity[],
        public topSpendByDebitType: TopTransactionsEntity[],
        public totalSpend: number,
        public totalIncome: number,
        public totalTransactions: number,
    ) {
        super(topSpendByCategory, topSpendByCreditType, topSpendByDebitType, totalSpend, totalIncome, totalTransactions);
    }

    static fromJSON(json: TransactionsSummaryEntity): TransactionSummaryModel {
        return new TransactionSummaryModel(
            json.topSpendByCategory,
            json.topSpendByCreditType,
            json.topSpendByDebitType,
            json.totalSpend,
            json.totalIncome,
            json.totalTransactions,
        );
    }
}