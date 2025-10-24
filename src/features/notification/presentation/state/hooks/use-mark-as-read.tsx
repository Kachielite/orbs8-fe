import {useMutation, useQueryClient} from 'react-query';
import {toast} from 'sonner';

import {extractErrorHooks} from '@/core/helpers/extract-error-hooks';
import {markAsReadEffect} from '@/features/notification/presentation/state/store/effects';

const useMarkAsRead = () => {
    const queryClient = useQueryClient();
    const {mutate: markAsReadHandler, isLoading: isMarkingAsRead} = useMutation(
        ['markAsRead'],
        async (id: number) => {
            return markAsReadEffect(id);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['notifications']);
                toast.success('Notification marked as read');
            },
            onError: error => {
                const errorMessage = extractErrorHooks(error, 'useMarkAsRead');
                toast.error(errorMessage);
            },
        }
    );

    return {
        markAsReadHandler,
        isMarkingAsRead,
    };
};

export default useMarkAsRead;
