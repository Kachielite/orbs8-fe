import {useMutation, useQueryClient} from 'react-query';
import {toast} from 'sonner';

import {extractErrorHooks} from '@/core/helpers/extract-error-hooks';
import {markAllAsReadEffect} from '@/features/notification/presentation/state/store/effects';

const useMarkAllAsRead = () => {
    const queryClient = useQueryClient();
    const {mutate: markAllAsReadHandler, isLoading: isMarkingAsRead} =
        useMutation(
            ['markAllAsRead'],
            async () => {
                return markAllAsReadEffect();
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(['notifications']);
                    toast.success('All notifications marked as read');
                },
                onError: error => {
                    const errorMessage = extractErrorHooks(error, 'useMarkAsRead');
                    toast.error(errorMessage);
                },
            }
        );

    return {
        markAllAsReadHandler,
        isMarkingAsRead,
    };
};

export default useMarkAllAsRead;
