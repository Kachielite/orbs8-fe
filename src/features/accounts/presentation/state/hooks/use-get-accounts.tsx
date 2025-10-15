import {useQuery} from 'react-query';
import {toast} from 'sonner';

import {useAppStore} from '@/core/common/presentation/state/store';
import {extractErrorHooks} from '@/core/helpers/extract-error-hooks';
import {getAccountsEffect} from '@/features/accounts/presentation/state/store/effects';

const useGetAccounts = () => {
  const { setAccounts } = useAppStore();

  const {
    isLoading: isGettingAccounts,
    data: accounts,
    error,
  } = useQuery(
    ['accounts'],
    async () => {
      return getAccountsEffect();
    },
    {
      onSuccess: accounts => {
        setAccounts(accounts);
      },
      onError: error => {
        const errorMessage = extractErrorHooks(error, 'useGetAccounts');
        toast.error(errorMessage);
      },
    }
  );

  return {
    isGettingAccounts,
    accounts,
    error,
  };
};

export default useGetAccounts;
