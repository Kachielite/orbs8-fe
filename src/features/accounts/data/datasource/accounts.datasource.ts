import {inject, injectable} from 'tsyringe';

import extractErrorDatasource from '@/core/helpers/extract-error-datasource';
import {AccountsNetwork} from '@/features/accounts/data/datasource/accounts.network';
import {AccountsModel, AccountSummaryModel,} from '@/features/accounts/data/model/accounts.model';

export interface IAccountsDataSource {
  getAccountById(id: number): Promise<AccountsModel>;
  getAccounts(): Promise<AccountsModel[]>;
  getAccountSummary(): Promise<AccountSummaryModel>;
}

@injectable()
export class AccountDataSource implements IAccountsDataSource {
  constructor(
    @inject(AccountsNetwork) private readonly accountsNetwork: AccountsNetwork
  ) {}

  async getAccountById(id: number): Promise<AccountsModel> {
    try {
      const response = await this.accountsNetwork.getAccountById(id);
      return AccountsModel.fromJSON(response);
    } catch (error) {
      throw extractErrorDatasource(error, 'AccountDataSource:getAccountById');
    }
  }

  async getAccounts(): Promise<AccountsModel[]> {
    try {
      const response = await this.accountsNetwork.getAccounts();
      return response.map((item: AccountsModel) =>
        AccountsModel.fromJSON(item)
      );
    } catch (error) {
      throw extractErrorDatasource(error, 'AccountDataSource:getAccounts');
    }
  }

  async getAccountSummary(): Promise<AccountSummaryModel> {
    try {
      const response = await this.accountsNetwork.getAccountSummary();
      return AccountSummaryModel.fromJSON(response);
    } catch (error) {
      throw extractErrorDatasource(
        error,
        'AccountDataSource:getAccountSummary'
      );
    }
  }
}
