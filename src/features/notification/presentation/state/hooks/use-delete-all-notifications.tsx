import {useMutation, useQueryClient} from 'react-query';
import {toast} from 'sonner';

import {extractErrorHooks} from '@/core/helpers/extract-error-hooks';
import {deleteAllNotificationEffects} from '@/features/notification/presentation/state/store/effects';

const useDeleteAllNotifications = () => {
    const queryClient = useQueryClient();
    const {
        mutate: deleteAllNotificationHandler,
        isLoading: isDeletingAllNotifications,
    } = useMutation(
        ['deleteAllNotifications'],
        async () => {
            return deleteAllNotificationEffects();
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['notifications']);
                toast.success('All notifications have been deleted');
            },
            onError: error => {
                const errorMessage = extractErrorHooks(
                    error,
                    'useDeleteAllNotifications'
                );
                toast.error(errorMessage);
            },
        }
    );

    return {
        deleteAllNotificationHandler,
        isDeletingAllNotifications,
    };
};

export default useDeleteAllNotifications;
