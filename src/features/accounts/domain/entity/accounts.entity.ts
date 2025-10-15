export class AccountEntity {
  public id: number;
  public accountName: string;
  public accountNumber: string;
  public currentBalance: number;
  public currencyName: string;
  public currencyCode: string;
  public bankId: number;
  public bankName: string;

  constructor(
    id: number,
    accountName: string,
    accountNumber: string,
    currentBalance: number,
    currencyName: string,
    currencyCode: string,
    bankId: number,
    bankName: string
  ) {
    this.id = id;
    this.accountName = accountName;
    this.accountNumber = accountNumber;
    this.currentBalance = currentBalance;
    this.currencyName = currencyName;
    this.currencyCode = currencyCode;
    this.bankId = bankId;
    this.bankName = bankName;
  }
}

export class AccountSummaryEntity {
  public totalBalance: number;
  public spendChange: number;
  public quotes: Record<string, number>;

  constructor(
    totalBalance: number,
    spendChange: number,
    quotes: Record<string, number>
  ) {
    this.totalBalance = totalBalance;
    this.spendChange = spendChange;
    this.quotes = quotes;
  }
}
