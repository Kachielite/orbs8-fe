import { useQuery } from 'react-query';
import { toast } from 'sonner';

import { useAppStore } from '@/core/common/presentation/state/store';
import { extractErrorHooks } from '@/core/helpers/extract-error-hooks';
import { getBanksEffect } from '@/features/bank/presentation/state/store/effects';

const useGetBanks = () => {
  const { setBanks } = useAppStore();

  const {
    isLoading: isGettingBanks,
    data: banks,
    error,
  } = useQuery(
    ['banks'],
    async () => {
      return getBanksEffect();
    },
    {
      onSuccess: banks => {
        setBanks(banks);
      },
      onError: error => {
        const errorMessage = extractErrorHooks(error, 'useGetBanks');
        toast.error(errorMessage);
      },
    }
  );

  return {
    isGettingBanks,
    banks,
    error,
  };
};

export default useGetBanks;
