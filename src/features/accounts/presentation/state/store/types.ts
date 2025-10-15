import {AccountEntity, AccountSummaryEntity} from "@/features/accounts/domain/entity/accounts.entity";

export type AccountsSlice = {
    // state
    accounts: AccountEntity[] | null,
    account: AccountEntity | null,
    accountSummary: AccountSummaryEntity | null,
    // actions
    setAccounts: (accounts: AccountEntity[]) => void,
    setAccount: (account: AccountEntity) => void,
    setAccountSummary: (accountSummary: AccountSummaryEntity | null) => void,
}