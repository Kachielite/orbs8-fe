import {Either} from "fp-ts/Either";

import {Failure} from "@/core/errors/failure.error";
import {AccountEntity, AccountSummaryEntity} from "@/features/accounts/domain/entity/accounts.entity";

export interface IAccountsRepository {
    getAccountById(id: number): Promise<Either<Failure, AccountEntity>>;
    getAccounts(): Promise<Either<Failure, AccountEntity[]>>;
    getAccountSummary(): Promise<Either<Failure, AccountSummaryEntity>>;
}