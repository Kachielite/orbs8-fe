import {Pagination} from "@/core/interfaces/pagination.interface";
import {TransactionsEntity, TransactionsSummaryEntity} from "@/features/transactions/domain/entity/transactions.entity";

export type TransactionSlice = {
    // states
    transactions: Pagination<TransactionsEntity> | null ;
    transaction: TransactionsEntity | null;
    transactionSummary: TransactionsSummaryEntity| null;
    transactionStartDate: string;
    transactionEndDate: string;
    // actions
    setTransactions: (transactions: Pagination<TransactionsEntity> | null) => void;
    setTransaction: (transaction: TransactionsEntity | null) => void;
    setTransactionSummary: (transactionSummary: TransactionsSummaryEntity | null) => void;
    setTransactionStartDate: (startDate: string) => void;
    setTransactionEndDate: (endDate: string) => void;
}