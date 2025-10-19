import {TransactionType} from '@/features/transactions/domain/entity/enum/transaction-type.enum';
import {
    accountSummaryEntity,
    TopMerchantsEntity,
    TopTransactionsEntity,
    TransactionsEntity,
    TransactionsSummaryEntity,
} from '@/features/transactions/domain/entity/transactions.entity';

export class TransactionModel extends TransactionsEntity {
  constructor(
    public id: number,
    public transactionId: string,
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
    public createdAt: string
  ) {
    super(
      id,
      transactionId,
      amount,
      type,
      description,
      transactionDate,
      category,
      categoryId,
      account,
      accountId,
      bank,
      bankId,
      createdAt
    );
  }

  static fromJSON(json: TransactionsEntity): TransactionModel {
    return new TransactionModel(
      json.id,
      json.transactionId,
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
      json.createdAt
    );
  }
}

export class TransactionSummaryModel extends TransactionsSummaryEntity {
  constructor(
    public topSpendByCategory: TopTransactionsEntity[],
    public topIncomeByCategory: TopTransactionsEntity[],
    public totalSpend: number,
    public totalIncome: number,
    public totalTransactions: number,
    public currentMonthSpend: number,
    public currentMonthIncome: number,
    public lastMonthSpend: number,
    public lastMonthIncome: number,
    public accountSummaries: accountSummaryEntity[],
    public topMerchants: TopMerchantsEntity[]
  ) {
    super(
      topSpendByCategory,
      topIncomeByCategory,
      totalSpend,
      totalIncome,
        totalTransactions,
        currentMonthSpend,
        currentMonthIncome,
        lastMonthSpend,
        lastMonthIncome,
        accountSummaries,
        topMerchants
    );
  }

  static fromJSON(json: TransactionsSummaryEntity): TransactionSummaryModel {
    return new TransactionSummaryModel(
      json.topSpendByCategory,
      json.topIncomeByCategory,
      json.totalSpend,
      json.totalIncome,
        json.totalTransactions,
        json.currentMonthSpend,
        json.currentMonthIncome,
        json.lastMonthSpend,
        json.lastMonthIncome,
        json.accountSummaries,
        json.topMerchants
    );
  }
}
