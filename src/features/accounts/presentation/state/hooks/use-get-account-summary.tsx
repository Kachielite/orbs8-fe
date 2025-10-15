import {useQuery} from 'react-query';
import {toast} from 'sonner';

import {useAppStore} from '@/core/common/presentation/state/store';
import {extractErrorHooks} from '@/core/helpers/extract-error-hooks';
import {getAccountSummaryEffect} from '@/features/accounts/presentation/state/store/effects';

const useGetAccountSummary = () => {
  const { setAccountSummary } = useAppStore();

  const {
    isLoading: isGettingAccountSummary,
    data: accountSummary,
    error,
  } = useQuery(
    ['account-summary'],
    async () => {
      return getAccountSummaryEffect();
    },
    {
      onSuccess: accountSummary => {
        setAccountSummary(accountSummary);
      },
      onError: error => {
        const errorMessage = extractErrorHooks(error, 'useGetAccountSummary');
        toast.error(errorMessage);
      },
    }
  );

  return {
    isGettingAccountSummary,
    accountSummary,
    error,
  };
};

export default useGetAccountSummary;
