import { useMutation } from 'react-query';
import { getSyncStatusEffect } from '@/features/email/presentation/state/store/effects';
import { toast } from 'sonner';
import { extractErrorHooks } from '@/core/helpers/extract-error-hooks';
import { useAppStore } from '@/core/common/presentation/state/store';

const useGetSyncStatus = () => {
  const { setSyncStatus } = useAppStore();

  const {
    isLoading: isGettingEmailSyncStatus,
    mutateAsync: getEmailSyncStatusHandler,
  } = useMutation(
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
    getEmailSyncStatusHandler,
  };
};

export default useGetSyncStatus;
