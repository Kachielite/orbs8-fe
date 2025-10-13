import {useQuery} from 'react-query';
import {toast} from 'sonner';

import {useAppStore} from '@/core/common/presentation/state/store';
import {extractErrorHooks} from '@/core/helpers/extract-error-hooks';
import {syncEmailEffect} from '@/features/email/presentation/state/store/effects';

const useSyncEmail = () => {
  const { setStep } = useAppStore();

  const { isLoading: isSyncingEmail } =
    useQuery(
      ['sync-email'],
      async () => {
        return syncEmailEffect();
      },
      {
        onSuccess: message => {
          toast.success(message);
          setStep(4);
        },
        onError: error => {
          const errorMessage = extractErrorHooks(error, 'useGetToken');
          toast.error(errorMessage);
        },
      }
    );

  return {
    isSyncingEmail,
  };
};

export default useSyncEmail;
