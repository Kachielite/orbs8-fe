import {useMutation} from 'react-query';
import {toast} from 'sonner';

import {extractErrorHooks} from '@/core/helpers/extract-error-hooks';
import {markAllAsReadEffect} from '@/features/notification/presentation/state/store/effects';

const useMarkAllAsRead = () => {
    const {mutate: markAllAsReadHandler, isLoading: isMarkingAsRead} =
        useMutation(
            ['markAllAsRead'],
            async () => {
                return markAllAsReadEffect();
            },
            {
                onSuccess: data => {
                    toast.success(data);
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
