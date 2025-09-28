import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getTokenEffect } from '@/features/email/presentation/state/store/effects';
import { Failure } from '@/core/errors/failure.error';
import { extractErrorHooks } from '@/core/helpers/extract-error-hooks';
import { toast } from 'sonner';
import { useAppStore } from '@/core/common/presentation/state/store';

const useGetToken = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const token = query.get('code');
  const { setStep } = useAppStore();

  const { isLoading: IsLinkingEmail } = useQuery(
    ['token'],
    async () => {
      if (!token) {
        throw new Failure('Could not find Google token in the URL');
      }
      return getTokenEffect({ code: token });
    },
    {
      enabled: !!token,
      onSuccess: () => {
        toast.success('Email linked successfully');
        // remove queries from url using React Router
        navigate(location.pathname, { replace: true });
        setStep(2);
      },
      onError: error => {
        const errorMessage = extractErrorHooks(error, 'useGetToken');
        setStep(1);
        toast.error(errorMessage);
      },
    }
  );

  return {
    IsLinkingEmail,
  };
};

export default useGetToken;
