import {TransactionType} from "@/features/transactions/domain/entity/enum/transaction-type.enum";

export class TransactionsEntity {
    public id: number;
    public amount: number;
    public type: TransactionType;
    public description: string;
    public transactionDate: string;
    public category: string;
    public account: string;
    public bank: string;
    public createdAt: string;

    constructor(id: number, amount: number, type: TransactionType, description: string, transactionDate: string, category: string, account: string, bank: string, createdAt: string) {
        this.id = id;
        this.amount = amount;
        this.type = type;
        this.description = description;
        this.transactionDate = transactionDate;
        this.category = category;
        this.account = account;
        this.bank = bank;
        this.createdAt = createdAt;
    }
}


export class TransactionsSummaryEntity {
    public topSpendByCategory: TopTransactionsEntity[];
    public topSpendByCreditType: TopTransactionsEntity[];
    public topSpendByDebitType: TopTransactionsEntity[];
    public totalSpend: number;
    public totalIncome: number;
    public totalTransactions: number;

    constructor(topSpendByCategory: TopTransactionsEntity[], topSpendByCreditType: TopTransactionsEntity[], topSpendByDebitType: TopTransactionsEntity[], totalSpend: number, totalIncome: number, totalTransactions: number) {
        this.topSpendByCategory = topSpendByCategory;
        this.topSpendByCreditType = topSpendByCreditType;
        this.topSpendByDebitType = topSpendByDebitType;
        this.totalSpend = totalSpend;
        this.totalIncome = totalIncome;
        this.totalTransactions = totalTransactions;
    }
}


export class TopTransactionsEntity {
    public name: string;
    public amount: number;

    constructor(name: string, amount: number) {
        this.name = name;
        this.amount = amount;
    }
}