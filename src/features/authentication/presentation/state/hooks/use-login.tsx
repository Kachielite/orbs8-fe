import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useAppStore } from '@/core/common/presentation/state/store';
import { extractErrorHooks } from '@/core/helpers/extract-error-hooks';
import { loginEffect } from '@/features/authentication/presentation/state/store/effect';
import {
  loginSchema,
  LoginSchemaType,
} from '@/features/authentication/presentation/validation/auth.validation';

const useLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAppStore();

  const loginForm = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: loginHandler, isLoading: isLoggingIn } = useMutation(
    ['login'],
    async (data: LoginSchemaType) => {
      return loginEffect({
        email: data.email,
        password: data.password,
      });
    },
    {
      onSuccess: data => {
        setAuth(data);
        navigate('/');
      },
      onError: error => {
        const errorMessage = extractErrorHooks(error, 'useLogin');
        toast.error(errorMessage);
      },
    }
  );

  return {
    loginForm,
    loginHandler,
    isLoggingIn,
  };
};

export default useLogin;
