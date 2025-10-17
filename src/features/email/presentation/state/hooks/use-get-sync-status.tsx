import {useQuery} from 'react-query';
import {toast} from 'sonner';

import {useAppStore} from '@/core/common/presentation/state/store';
import {extractErrorHooks} from '@/core/helpers/extract-error-hooks';
import {getSyncStatusEffect} from '@/features/email/presentation/state/store/effects';

const useGetSyncStatus = () => {
  const { setSyncStatus } = useAppStore();

  const {
    isLoading: isGettingEmailSyncStatus,
  } = useQuery(
    ['sync-status'],
    async () => {
      return getSyncStatusEffect();
    },
    {
      onSuccess: syncStatus => {
        setSyncStatus(syncStatus);
      },
      onError: error => {
        const errorMessage = extractErrorHooks(error, 'useGetOauthUrl');
        toast.error(errorMessage);
      },
    }
  );

  return {
    isGettingEmailSyncStatus,
  };
};

export default useGetSyncStatus;
