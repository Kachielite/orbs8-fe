import {useQuery} from 'react-query';
import {toast} from 'sonner';

import {useAppStore} from '@/core/common/presentation/state/store';
import {extractErrorHooks} from '@/core/helpers/extract-error-hooks';
import {ITransactionQuery} from '@/features/transactions/domain/entity/interface/transactions.interface';
import {getTransactionSummaryEffect} from '@/features/transactions/presentation/state/store/effects';

const useGetTransactionSummary = (query: ITransactionQuery) => {
  const { setTransactionSummary } = useAppStore();

  const {
    isLoading: isGettingTransactionSummary,
    data: transactionSummary,
    error,
  } = useQuery(
    ['transaction-summary', query],
    async () => {
      return getTransactionSummaryEffect(query);
    },
    {
      onSuccess: transactionSummary => {
        setTransactionSummary(transactionSummary);
      },
      onError: error => {
        const errorMessage = extractErrorHooks(error, 'useGetTransactionSummary');
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
