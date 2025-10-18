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

      // Use URLSearchParams so we can append repeated keys for arrays
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      if (query.transactionType) {
        params.append('transactionType', query.transactionType);
      }

      if (query.startDate && query.endDate) {
        params.append('startDate', query.startDate);
        params.append('endDate', query.endDate);
      }

      // For array fields, append each value as a repeated parameter: categoryIds=20&categoryIds=2
      if (query.categoryIds) {
        query.categoryIds.forEach(id =>
          params.append('categoryIds', id.toString())
        );
      }

      if (query.accountIds) {
        query.accountIds.forEach(id =>
          params.append('accountIds', id.toString())
        );
      }

      if (query.bankIds) {
        query.bankIds.forEach(id => params.append('bankIds', id.toString()));
      }

      if (query.search) {
        params.append('search', query.search);
      }

      if (query.orderBy) {
        params.append('order', query.orderBy);
      }

      if (query.sortBy) {
        params.append('sort', query.sortBy);
      }

      const url = `${this.transactionPath}?${params.toString()}`;
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
