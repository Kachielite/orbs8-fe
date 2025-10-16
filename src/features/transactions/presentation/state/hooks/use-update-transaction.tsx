import {useMutation, useQueryClient} from 'react-query';
import {toast} from 'sonner';

import {extractErrorHooks} from '@/core/helpers/extract-error-hooks';
import {IUpdateTransactionQuery} from '@/features/transactions/domain/entity/interface/transactions.interface';
import {updateTransactionEffect} from '@/features/transactions/presentation/state/store/effects';

const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  const {
    mutate: updateTransaction,
    isLoading: isUpdatingTransaction,
    error,
  } = useMutation(
    async ({ id, payload }: { id: number; payload: IUpdateTransactionQuery }) => {
      return updateTransactionEffect(id, payload);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch transactions
        queryClient.invalidateQueries(['transactions']);
        toast.success('Transaction updated successfully');
      },
      onError: error => {
        const errorMessage = extractErrorHooks(error, 'useUpdateTransaction');
        toast.error(errorMessage);
      },
    }
  );

  return {
    updateTransaction,
    isUpdatingTransaction,
    error,
  };
};

export default useUpdateTransaction;
