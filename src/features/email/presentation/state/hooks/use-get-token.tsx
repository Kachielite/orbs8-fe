import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { getTokenEffect } from '@/features/email/presentation/state/store/effects';
import { Failure } from '@/core/errors/failure.error';
import { extractErrorHooks } from '@/core/helpers/extract-error-hooks';
import { toast } from 'sonner';

const useGetToken = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');

  const { isLoading: linkingEmail, mutateAsync: getTokenHandler } = useMutation(
    ['token'],
    async () => {
      if (!token) {
        throw new Failure('Could not find Google token in the URL');
      }
      return getTokenEffect({ code: token });
    },
    {
      onSuccess: () => {
        toast.success('Email linked successfully');
        navigate('/');
      },
      onError: error => {
        const errorMessage = extractErrorHooks(error, 'useGetToken');
        toast.error(errorMessage);
      },
    }
  );

  return {
    linkingEmail,
    getTokenHandler,
  };
};

export default useGetToken;
