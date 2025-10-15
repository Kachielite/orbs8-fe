import {useQuery} from 'react-query';
import {toast} from 'sonner';

import {useAppStore} from '@/core/common/presentation/state/store';
import {extractErrorHooks} from '@/core/helpers/extract-error-hooks';
import {getAccountByIdEffect} from '@/features/accounts/presentation/state/store/effects';

const useGetAccountById = (id: number) => {
  const { setAccount } = useAppStore();

  const {
    isLoading: isGettingAccount,
    data: account,
    error,
  } = useQuery(
    ['account', id],
    async () => {
      return getAccountByIdEffect(id);
    },
    {
      enabled: !!id,
      onSuccess: account => {
        setAccount(account);
      },
      onError: error => {
        const errorMessage = extractErrorHooks(error, 'useGetAccountById');
        toast.error(errorMessage);
      },
    }
  );

  return {
    isGettingAccount,
    account,
    error,
  };
};

export default useGetAccountById;
