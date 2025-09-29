import { useMutation } from 'react-query';
import { getOAuthUrlEffect } from '@/features/email/presentation/state/store/effects';
import { extractErrorHooks } from '@/core/helpers/extract-error-hooks';
import { toast } from 'sonner';

const useGetOauthUrl = () => {
  const { isLoading: isGettingOAuthUrl, mutateAsync: getOAuthUrlHandler } =
    useMutation(
      ['oauth'],
      async () => {
        return getOAuthUrlEffect();
      },
      {
        onSuccess: url => {
          window.location.href = url;
        },
        onError: error => {
          const errorMessage = extractErrorHooks(error, 'useGetOauthUrl');
          toast.error(errorMessage);
        },
      }
    );

  return {
    isGettingOAuthUrl,
    getOAuthUrlHandler,
  };
};

export default useGetOauthUrl;
