import { useMutation } from 'react-query';
import { syncEmailEffect } from '@/features/email/presentation/state/store/effects';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  manualSyncRequest,
  ManualSyncRequestSchemaType,
} from '@/features/email/presentation/validation/email-sync';
import { toast } from 'sonner';
import { extractErrorHooks } from '@/core/helpers/extract-error-hooks';
import { useAppStore } from '@/core/common/presentation/state/store';

const useSyncEmail = () => {
  const { setStep } = useAppStore();
  const syncEmailForm = useForm<ManualSyncRequestSchemaType>({
    resolver: zodResolver(manualSyncRequest),
    defaultValues: {
      labelName: '',
    },
  });

  const { isLoading: isSyncingEmail, mutateAsync: syncEmailHandler } =
    useMutation(
      ['sync-email'],
      async (data: ManualSyncRequestSchemaType) => {
        return syncEmailEffect({ labelName: data.labelName });
      },
      {
        onSuccess: message => {
          syncEmailForm.reset();
          toast.success(message);
          setStep(3);
        },
        onError: error => {
          const errorMessage = extractErrorHooks(error, 'useGetToken');
          toast.error(errorMessage);
        },
      }
    );

  return {
    syncEmailForm,
    isSyncingEmail,
    syncEmailHandler,
  };
};

export default useSyncEmail;
