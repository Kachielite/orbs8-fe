import {TransactionType} from "@/features/transactions/domain/entity/enum/transaction-type.enum";

export interface ITransactionQuery {
    transactionType?: TransactionType;
    startDate?: string;
    endDate?: string;
    categoryIds?: number[];
    accountIds?: number[];
    bankIds?: number[];
    orderBy?: 'asc' | 'desc';
    sortBy?: 'date' | 'amount' | 'createdAt';
    search?: string;
    page?: number;
    limit?: number;
}

export interface IUpdateTransactionQuery {
    categoryId: number;
    commonName?: string;
    applyToAll?: boolean;
}

export interface ITransactionSummaryQuery {
    startDate: string;
    endDate: string;
}