import {TransactionType} from '@/features/transactions/domain/entity/enum/transaction-type.enum';

export class TransactionsEntity {
  public id: number;
  public transactionId: string;
  public amount: number;
  public type: TransactionType;
  public description: string;
  public transactionDate: string;
  public category: string;
  public categoryId: number;
  public account: string;
  public accountId: number;
  public bank: string;
  public bankId: number;
  public createdAt: string;

  constructor(
    id: number,
    transactionId: string,
    amount: number,
    type: TransactionType,
    description: string,
    transactionDate: string,
    category: string,
    categoryId: number,
    account: string,
    accountId: number,
    bank: string,
    bankId: number,
    createdAt: string
  ) {
    this.id = id;
    this.transactionId = transactionId;
    this.amount = amount;
    this.type = type;
    this.description = description;
    this.transactionDate = transactionDate;
    this.category = category;
    this.categoryId = categoryId;
    this.account = account;
    this.accountId = accountId;
    this.bank = bank;
    this.bankId = bankId;
    this.createdAt = createdAt;
  }
}

export class TransactionsSummaryEntity {
  public topSpendByCategory: TopTransactionsEntity[];
  public topIncomeByCategory: TopTransactionsEntity[];
  public totalSpend: number;
  public totalIncome: number;
  public totalTransactions: number;
    public currentMonthSpend: number;
    public currentMonthIncome: number;
    public lastMonthSpend: number;
    public lastMonthIncome: number;
    public accountSummaries: accountSummaryEntity[];
    public topMerchants: TopMerchantsEntity[];

  constructor(
    topSpendByCategory: TopTransactionsEntity[],
    topIncomeByCategory: TopTransactionsEntity[],
    totalSpend: number,
    totalIncome: number,
    totalTransactions: number,
    currentMonthSpend: number,
    currentMonthIncome: number,
    lastMonthSpend: number,
    lastMonthIncome: number,
    accountSummaries: accountSummaryEntity[],
    topMerchants: TopMerchantsEntity[]
  ) {
    this.topSpendByCategory = topSpendByCategory;
    this.topIncomeByCategory = topIncomeByCategory;
    this.totalSpend = totalSpend;
    this.totalIncome = totalIncome;
    this.totalTransactions = totalTransactions;
      this.currentMonthSpend = currentMonthSpend;
      this.currentMonthIncome = currentMonthIncome;
      this.lastMonthSpend = lastMonthSpend;
      this.lastMonthIncome = lastMonthIncome;
      this.accountSummaries = accountSummaries;
      this.topMerchants = topMerchants;
  }
}

export class TopTransactionsEntity {
  public name: string;
  public amount: number;
  public percentage: number;
    public trend: '↑' | '=' | '↓';

    constructor(
        name: string,
        amount: number,
        percentage: number,
        trend: '↑' | '=' | '↓'
    ) {
    this.name = name;
    this.amount = amount;
    this.percentage = percentage;
        this.trend = trend;
  }
}

export class accountSummaryEntity {
    public accountName: string;
    public totalSpend: number;
    public totalIncome: number;
    public currentBalance: number;

    constructor(
        accountName: string,
        totalSpend: number,
        totalIncome: number,
        currentBalance: number
    ) {
        this.accountName = accountName;
        this.totalSpend = totalSpend;
        this.totalIncome = totalIncome;
        this.currentBalance = currentBalance;
    }
}

export class TopMerchantsEntity {
    public name: string;
    public amount: number;
    public percentage: number;
    public trend: '↑' | '=' | '↓';

    constructor(
        name: string,
        amount: number,
        percentage: number,
        trend: '↑' | '=' | '↓'
    ) {
        this.name = name;
        this.amount = amount;
        this.percentage = percentage;
        this.trend = trend;
    }
}
