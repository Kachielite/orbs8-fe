import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import {useNavigate} from 'react-router-dom';
import {toast} from 'sonner';

import {extractErrorHooks} from '@/core/helpers/extract-error-hooks';
import {registerEffect} from '@/features/authentication/presentation/state/store/effect';
import {
    RegisterFormSchemaType,
    registerSchema,
    RegisterSchemaType,
} from '@/features/authentication/presentation/validation/auth.validation';

const useRegister = () => {
  const navigate = useNavigate();

  const registerForm = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
        currencyCode: 'USD',
    },
  });

  const { mutateAsync: registerHandler, isLoading: isRegistering } =
    useMutation(
      ['register'],
      async (data: RegisterSchemaType) => {
        return registerEffect({
          name: data.name,
          email: data.email,
          password: data.password,
            currencyCode: data.currencyCode,
        });
      },
      {
        onSuccess: () => {
          toast.success('Register successfully, please login');
          navigate('/login');
          registerForm.reset();
        },
        onError: error => {
          const errorMessage = extractErrorHooks(error, 'useRegister');
          toast.error(errorMessage);
        },
      }
    );

  return {
    registerForm,
    registerHandler,
    isRegistering,
  };
};

export default useRegister;
