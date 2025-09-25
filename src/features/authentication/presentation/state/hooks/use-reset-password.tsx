import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useAppStore } from '@/core/common/presentation/state/store';
import { extractErrorHooks } from '@/core/helpers/extract-error-hooks';
import { resetPasswordEffect } from '@/features/authentication/presentation/state/store/effect';
import {
  ResetPasswordFormSchemaType,
  resetPasswordSchema,
} from '@/features/authentication/presentation/validation/auth.validation';

const useResetPassword = () => {
  const navigate = useNavigate();
  const { resetPasswordToken, setResetPasswordToken } = useAppStore();

  const resetPasswordForm = useForm<ResetPasswordFormSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirmPassword: '',
      token: resetPasswordToken ?? '',
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
          setResetPasswordToken(null);
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
