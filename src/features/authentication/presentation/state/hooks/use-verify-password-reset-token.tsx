import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useAppStore } from '@/core/common/presentation/state/store';
import { Failure } from '@/core/errors/failure.error';
import { extractErrorHooks } from '@/core/helpers/extract-error-hooks';
import { verifyPasswordResetTokenEffect } from '@/features/authentication/presentation/state/store/effect';

const useVerifyPasswordResetToken = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  const email = params.get('email');

  const { setResetPasswordToken } = useAppStore();

  const { isLoading: isVerifyingPassword } = useQuery(
    ['verifyPasswordResetToken'],
    async () => {
      if (!token || !email) {
        throw new Failure(
          'Invalid reset password link, please request a new one'
        );
      }
      return verifyPasswordResetTokenEffect({
        token: token as string,
        email: email as string,
      });
    },
    {
      onSuccess: () => {
        setResetPasswordToken(token as string);
        toast.success(
          'Reset link verified successfully, you can reset your password now'
        );
        navigate('/login');
      },
      onError: error => {
        const errorMessage = extractErrorHooks(
          error,
          'useVerifyPasswordResetToken'
        );
        toast.error(errorMessage);
        navigate('/forget-password', { replace: true });
      },
    }
  );

  return {
    isVerifyingPassword,
  };
};

export default useVerifyPasswordResetToken;
