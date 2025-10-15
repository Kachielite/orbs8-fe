import {AccountEntity, AccountSummaryEntity} from "@/features/accounts/domain/accounts.entity";

export class AccountsModel extends AccountEntity {
    constructor(
           public id: number,
    public accountName: string,
    public accountNumber: string,
    public currentBalance: number,
    public currencyName: string,
    public currencyCode: string,
    public bankId: number,
    public bankName: string,
    ) {
        super(
            id,
            accountName,
            accountNumber,
            currentBalance,
            currencyName,
            currencyCode,
            bankId,
            bankName,
        );
    }

    static fromJSON(data: AccountEntity){
        return new AccountsModel(
            data.id,
            data.accountName,
            data.accountNumber,
            data.currentBalance,
            data.currencyName,
            data.currencyCode,
            data.bankId,
            data.bankName,
        );
    }
}


export class AccountSummaryModel extends AccountSummaryEntity {
    constructor(
            public totalBalance: number,
    public spendChange: number,
    public quotes: Record<string, number>,
    ) {
        super(
            totalBalance, spendChange, quotes,
        );
    }

    static fromJSON(data: AccountSummaryEntity){
        return new AccountSummaryModel(
            data.totalBalance,
            data.spendChange,
            data.quotes,
        );
    }
}