import {useQuery} from 'react-query';
import {toast} from 'sonner';

import {useAppStore} from '@/core/common/presentation/state/store';
import {extractErrorHooks} from '@/core/helpers/extract-error-hooks';
import {getBankByIdEffect} from '@/features/bank/presentation/state/store/effects';

const useGetBankById = (id: number) => {
  const { setBank } = useAppStore();

  const {
    isLoading: isGettingBank,
    data: bank,
    error,
  } = useQuery(
    ['bank', id],
    async () => {
      return getBankByIdEffect(id);
    },
    {
      enabled: !!id,
      onSuccess: bank => {
        setBank(bank);
      },
      onError: error => {
        const errorMessage = extractErrorHooks(error, 'useGetBankById');
        toast.error(errorMessage);
      },
    }
  );

  return {
    isGettingBank,
    bank,
    error,
  };
};

export default useGetBankById;
