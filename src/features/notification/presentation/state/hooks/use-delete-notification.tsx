import {useMutation, useQueryClient} from 'react-query';
import {toast} from 'sonner';

import {extractErrorHooks} from '@/core/helpers/extract-error-hooks';
import {deleteNotificationEffect} from '@/features/notification/presentation/state/store/effects';

const useDeleteNotification = () => {
    const queryClient = useQueryClient();
    const {mutate: deleteNotificationHandler, isLoading: isDeletingNotification} = useMutation(
        ['deleteNotification', 'id'],
        async (id: number) => {
            return deleteNotificationEffect(id);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['notifications']);
                toast.success('Notification deleted');
            },
            onError: error => {
                const errorMessage = extractErrorHooks(error, 'useDeleteNotification');
                toast.error(errorMessage);
            },
        }
    );

    return {
        deleteNotificationHandler,
        isDeletingNotification,
    };
};

export default useDeleteNotification;
