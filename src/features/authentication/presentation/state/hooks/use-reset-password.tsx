import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { extractErrorHooks } from '@/core/helpers/extract-error-hooks';
import { resetPasswordEffect } from '@/features/authentication/presentation/state/store/effect';
import {
  ResetPasswordFormSchemaType,
  resetPasswordSchema,
} from '@/features/authentication/presentation/validation/auth.validation';

const useResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  // Navigate away on missing/invalid token; keep a stable return type for the hook
  useEffect(() => {
    if (!token) {
      toast.error('Invalid reset password link, please request a new one');
      navigate('/forget-password', { replace: true });
    }
  }, [token, navigate]);

  const resetPasswordForm = useForm<ResetPasswordFormSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirmPassword: '',
      token: token ?? '',
    },
  });

  const { mutateAsync: resetPasswordHandler, isLoading: isResettingPassword } =
    useMutation(
      ['resetPassword'],
      async (data: ResetPasswordFormSchemaType) => {
        return resetPasswordEffect({
          password: data.password,
          token: data.token,
        });
      },
      {
        onSuccess: () => {
          toast.success('Reset password successfully, please login');
          navigate('/login');
          resetPasswordForm.reset();
        },
        onError: error => {
          const errorMessage = extractErrorHooks(error, 'useResetPassword');
          toast.error(errorMessage);
        },
      }
    );

  return {
    resetPasswordForm,
    resetPasswordHandler,
    isResettingPassword,
  };
};

export default useResetPassword;
