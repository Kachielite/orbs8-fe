import {useQuery} from 'react-query';
import {toast} from 'sonner';

import {useAppStore} from '@/core/common/presentation/state/store';
import {extractErrorHooks} from '@/core/helpers/extract-error-hooks';
import {ITransactionQuery} from '@/features/transactions/domain/entity/interface/transactions.interface';
import {getTransactionsEffect} from '@/features/transactions/presentation/state/store/effects';

const useGetTransactions = (query: ITransactionQuery) => {
  const { setTransactions } = useAppStore();

  const {
    isLoading: isGettingTransactions,
    data: transactions,
    error,
  } = useQuery(
    ['transactions', query],
    async () => {
      return getTransactionsEffect(query);
    },
    {
      onSuccess: transactions => {
        setTransactions(transactions);
      },
      onError: error => {
        const errorMessage = extractErrorHooks(error, 'useGetTransactions');
        toast.error(errorMessage);
      },
    }
  );

  return {
    isGettingTransactions,
    transactions,
    error,
  };
};

export default useGetTransactions;
