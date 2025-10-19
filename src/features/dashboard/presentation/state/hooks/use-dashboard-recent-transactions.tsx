import { useQuery } from 'react-query';
import { toast } from 'sonner';

import { useAppStore } from '@/core/common/presentation/state/store';
import { extractErrorHooks } from '@/core/helpers/extract-error-hooks';
import { ITransactionQuery } from '@/features/transactions/domain/entity/interface/transactions.interface';
import { getTransactionsEffect } from '@/features/transactions/presentation/state/store/effects';

const useDashboardRecentTransactions = () => {
  const {
    dashboardStartDate,
    dashboardEndDate,
    setDashboardRecentTransactions,
  } = useAppStore();

  const query: ITransactionQuery = {
    page: 1,
    limit: 10,
    startDate: dashboardStartDate,
    endDate: dashboardEndDate,
  };

  const { isLoading: isGettingTransactions } = useQuery(
    ['recent-transactions', query, dashboardStartDate, dashboardEndDate],
    async () => {
      return getTransactionsEffect(query);
    },
    {
      onSuccess: transactions => {
        setDashboardRecentTransactions(transactions.data);
      },
      onError: error => {
        const errorMessage = extractErrorHooks(
          error,
          'useDashboardRecentTransactions'
        );
        toast.error(errorMessage);
      },
    }
  );

  return {
    isGettingTransactions,
  };
};

export default useDashboardRecentTransactions;
