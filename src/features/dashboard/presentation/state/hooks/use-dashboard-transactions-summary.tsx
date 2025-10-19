import { useQuery } from 'react-query';
import { toast } from 'sonner';

import { useAppStore } from '@/core/common/presentation/state/store';
import { extractErrorHooks } from '@/core/helpers/extract-error-hooks';
import { getTransactionSummaryEffect } from '@/features/transactions/presentation/state/store/effects';

const useDashboardTransactionsSummary = () => {
  const {
    setDashboardTransactionsSummary,
    dashboardStartDate,
    dashboardEndDate,
  } = useAppStore();

  const { isLoading: isGettingTransactionSummary } = useQuery(
    ['dashboard-transaction-summary', dashboardStartDate, dashboardEndDate],
    async () => {
      return getTransactionSummaryEffect({
        startDate: dashboardStartDate,
        endDate: dashboardEndDate,
      });
    },
    {
      onSuccess: transactionSummary => {
        setDashboardTransactionsSummary(transactionSummary);
      },
      onError: error => {
        const errorMessage = extractErrorHooks(
          error,
          'useDashboardTransactionsSummary'
        );
        toast.error(errorMessage);
      },
    }
  );

  return {
    isGettingTransactionSummary,
  };
};

export default useDashboardTransactionsSummary;
