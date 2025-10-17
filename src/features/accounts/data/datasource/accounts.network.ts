import {inject, injectable} from 'tsyringe';

import {BASE_URL} from '@/core/constants/env.constants';
import extractErrorNetwork from '@/core/helpers/extract-error-network';
import CustomAxios from '@/core/network/custom-axios';

@injectable()
export class AccountsNetwork {
  private readonly accountPath = `${BASE_URL}/account`;

  constructor(@inject('AxiosClient') private readonly axios: CustomAxios) {}

  public async getAccountById(id: number) {
    try {
      const response = await this.axios
        .getInstance()
        .get(`${this.accountPath}/${id}`);
      return response.data;
    } catch (error) {
      throw extractErrorNetwork(error, 'AccountsNetwork:getAccountById');
    }
  }

  public async getAccounts() {
    try {
      const response = await this.axios
        .getInstance()
        .get(`${this.accountPath}`);
      return response.data;
    } catch (error) {
      throw extractErrorNetwork(error, 'AccountsNetwork:getAccounts');
    }
  }

  public async getAccountSummary() {
    try {
      const response = await this.axios
        .getInstance()
        .get(`${this.accountPath}/summary`);
      return response.data;
    } catch (error) {
      throw extractErrorNetwork(error, 'AccountsNetwork:getAccountSummary');
    }
  }
}
