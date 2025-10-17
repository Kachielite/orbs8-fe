import { inject, injectable } from 'tsyringe';

import { BASE_URL } from '@/core/constants/env.constants';
import extractErrorNetwork from '@/core/helpers/extract-error-network';
import CustomAxios from '@/core/network/custom-axios';
import {
  ITransactionQuery,
  IUpdateTransactionQuery,
} from '@/features/transactions/domain/entity/interface/transactions.interface';

@injectable()
export class TransactionNetwork {
  private readonly transactionPath = `${BASE_URL}/transaction`;

  constructor(@inject('AxiosClient') private readonly axios: CustomAxios) {}

  public async getTransactions(query: ITransactionQuery) {
    try {
      // Construct query parameters
      const page = query.page || 1;
      const limit = query.limit || 50;

      const queryParams: Record<string, string> = {
        page: page.toString(),
        limit: limit.toString(),
      };

      if (query.transactionType) {
        queryParams['transactionType'] = query.transactionType;
      }

      if (query.startDate && query.endDate) {
        queryParams['startDate'] = query.startDate;
        queryParams['endDate'] = query.endDate;
      }

      if (query.categoryIds) {
        queryParams['categoryIds'] = query.categoryIds.join(',');
      }

      if (query.accountIds) {
        queryParams['accountIds'] = query.accountIds.join(',');
      }

      if (query.bankIds) {
        queryParams['bankIds'] = query.bankIds.join(',');
      }

      if (query.search) {
        queryParams['search'] = query.search;
      }

      if (query.orderBy) {
        queryParams['order'] = query.orderBy;
      }

      if (query.sortBy) {
        queryParams['sort'] = query.sortBy;
      }

      const url = `${this.transactionPath}?${new URLSearchParams(queryParams).toString()}`;
      const response = await this.axios.getInstance().get(url);
      return response.data;
    } catch (error) {
      throw extractErrorNetwork(error, 'TransactionNetwork:getTransactions');
    }
  }

  public async getTransactionById(id: number) {
    try {
      const url = `${this.transactionPath}/${id}`;
      const response = await this.axios.getInstance().get(url);
      return response.data;
    } catch (error) {
      throw extractErrorNetwork(error, 'TransactionNetwork:getTransactionById');
    }
  }

  public async updateTransaction(id: number, payload: IUpdateTransactionQuery) {
    try {
      const requestBody: IUpdateTransactionQuery = {
        categoryId: payload.categoryId,
      };

      if (payload.commonName) {
        requestBody['commonName'] = payload.commonName;
      }

      if (payload.applyToAll !== undefined) {
        requestBody['applyToAll'] = payload.applyToAll;
      }

      const url = `${this.transactionPath}/${id}`;
      const response = await this.axios.getInstance().put(url, requestBody);
      return response.data;
    } catch (error) {
      throw extractErrorNetwork(error, 'TransactionNetwork:updateTransaction');
    }
  }

  public async getTransactionSummary(query: ITransactionQuery) {
    try {
      const url = `${this.transactionPath}/summary?startDate=${query.startDate}&endDate=${query.endDate}`;
      const response = await this.axios.getInstance().get(url);
      return response.data;
    } catch (error) {
      throw extractErrorNetwork(
        error,
        'TransactionNetwork:getTransactionSummary'
      );
    }
  }
}
