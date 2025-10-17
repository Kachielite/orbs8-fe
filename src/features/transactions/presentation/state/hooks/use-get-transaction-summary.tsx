import { useQuery } from 'react-query';
import { toast } from 'sonner';

import { useAppStore } from '@/core/common/presentation/state/store';
import { extractErrorHooks } from '@/core/helpers/extract-error-hooks';
import { getTransactionSummaryEffect } from '@/features/transactions/presentation/state/store/effects';

const useGetTransactionSummary = () => {
  const { setTransactionSummary, transactionStartDate, transactionEndDate } =
    useAppStore();

  const {
    isLoading: isGettingTransactionSummary,
    data: transactionSummary,
    error,
  } = useQuery(
    ['transaction-summary', transactionStartDate, transactionEndDate],
    async () => {
      return getTransactionSummaryEffect({
        startDate: transactionStartDate,
        endDate: transactionEndDate,
      });
    },
    {
      onSuccess: transactionSummary => {
        setTransactionSummary(transactionSummary);
      },
      onError: error => {
        const errorMessage = extractErrorHooks(
          error,
          'useGetTransactionSummary'
        );
        toast.error(errorMessage);
      },
    }
  );

  return {
    isGettingTransactionSummary,
    transactionSummary,
    error,
  };
};

export default useGetTransactionSummary;
