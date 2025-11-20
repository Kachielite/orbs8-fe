import {zodResolver} from '@hookform/resolvers/zod';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useMutation, useQueryClient} from 'react-query';
import {toast} from 'sonner';

import {useAppStore} from '@/core/common/presentation/state/store';
import {extractErrorHooks} from '@/core/helpers/extract-error-hooks';
import {verifyAccessToEmailLabelEffect} from '@/features/email/presentation/state/store/effects';
import {verifyEmailLabelSchema, VerifyEmailLabelSchemaType,} from '@/features/email/presentation/validation/email-sync';

const useVerifyEmailLabel = () => {
  const queryClient = useQueryClient();
    const {setStep, syncStatus} = useAppStore();

  const emailLabelForm = useForm<VerifyEmailLabelSchemaType>({
    resolver: zodResolver(verifyEmailLabelSchema),
    defaultValues: {
        labelName: syncStatus?.label || '',
    },
  });

  const {
    isLoading: verifyingAccess,
    mutateAsync: verifyEmailLabelAccessHandler,
  } = useMutation(
    ['verify-email-label'],
    async (data: VerifyEmailLabelSchemaType) => {
      return verifyAccessToEmailLabelEffect(data.labelName);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['user'],
        });
        emailLabelForm.reset();
        setStep(3);
          toast.success('Access to email label verified successfully');
      },
      onError: error => {
        const errorMessage = extractErrorHooks(error, 'useVerifyEmailLabel');
        toast.error(errorMessage);
      },
    }
  );

    useEffect(() => {
        emailLabelForm.reset({
            labelName: syncStatus?.label || '',
        });
    }, [emailLabelForm, syncStatus]);

  return {
    emailLabelForm,
    verifyingAccess,
    verifyEmailLabelAccessHandler,
  };
};

export default useVerifyEmailLabel;
