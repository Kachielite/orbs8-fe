import {useQuery} from 'react-query';
import {toast} from 'sonner';

import {useAppStore} from '@/core/common/presentation/state/store';
import {extractErrorHooks} from '@/core/helpers/extract-error-hooks';
import {getTransactionByIdEffect} from '@/features/transactions/presentation/state/store/effects';

const useGetTransactionById = (id: number) => {
  const { setTransaction } = useAppStore();

  const {
    isLoading: isGettingTransaction,
    data: transaction,
    error,
  } = useQuery(
    ['transaction', id],
    async () => {
      return getTransactionByIdEffect(id);
    },
    {
      enabled: !!id,
      onSuccess: transaction => {
        setTransaction(transaction);
      },
      onError: error => {
        const errorMessage = extractErrorHooks(error, 'useGetTransactionById');
        toast.error(errorMessage);
      },
    }
  );

  return {
    isGettingTransaction,
    transaction,
    error,
  };
};

export default useGetTransactionById;
