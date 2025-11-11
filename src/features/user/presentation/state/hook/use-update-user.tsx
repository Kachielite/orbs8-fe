import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {useMutation, useQueryClient} from 'react-query';
import {toast} from 'sonner';

import {useAppStore} from '@/core/common/presentation/state/store';
import {updateUserEffect} from '@/features/user/presentation/state/store/effects';
import {updateUserSchema, UpdateUserSchemaType,} from '@/features/user/presentation/validation/user.validation';

const useUpdateUser = () => {
    const {user} = useAppStore();
    const queryClient = useQueryClient();

    const updateUserForm = useForm<UpdateUserSchemaType>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            name: user?.name,
            currencyCode: user?.preferredCurrency,
        },
    });

    const {isLoading: isUpdatingUser, mutateAsync: updateUserHandler} =
        useMutation(
            async (payload: UpdateUserSchemaType) => {
                return updateUserEffect({
                    name: payload.name,
                    currencyCode: payload.currencyCode,
                });
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(['user']);
                    updateUserForm.reset();
                    toast.success('User updated successfully');
                },
            }
    );

    return {
        updateUserForm,
        isUpdatingUser,
        updateUserHandler,
    };
};

export default useUpdateUser;
