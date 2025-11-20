import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import {toast} from 'sonner';

import {Failure} from "@/core/errors/failure.error";
import {updatePasswordEffect} from '@/features/user/presentation/state/store/effects';
import {updatePasswordSchema, UpdatePasswordSchemaType,} from '@/features/user/presentation/validation/user.validation';

const useUpdatePassword = () => {
    const updatePasswordForm = useForm<UpdatePasswordSchemaType>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
        },
    });

    const {isLoading: isUpdatingPassword, mutateAsync: updatePasswordHandler} =
        useMutation(
            async (payload: UpdatePasswordSchemaType) => {
                return updatePasswordEffect({
                    currentPassword: payload.currentPassword,
                    newPassword: payload.newPassword,
                });
            },
            {
                onSuccess: () => {
                    updatePasswordForm.reset();
                    toast.success('User updated successfully');
                },
                onError: (error: Failure) => {
                    console.log(error);
                    toast.error(error.message || 'Failed to update user');
                }
            }
    );

    return {
        updatePasswordForm,
        isUpdatingPassword,
        updatePasswordHandler,
    };
};

export default useUpdatePassword;
