import {useMutation} from 'react-query';
import {toast} from 'sonner';

import {useAppStore} from '@/core/common/presentation/state/store';
import {extractErrorHooks} from '@/core/helpers/extract-error-hooks';
import {getNotificationEffect} from '@/features/notification/presentation/state/store/effects';

const useGetNotification = () => {
    const {setNotification, notification} = useAppStore();

    const {isLoading, mutateAsync} = useMutation(
        ['notification', notification?.id],
        () => getNotificationEffect(notification?.id as number),
        {
            onSuccess: data => {
                setNotification(data);
            },
            onError: error => {
                const errorMessage = extractErrorHooks(error, 'useGetNotification');
                toast.error(errorMessage);
            },
        }
    );

    return {
        getNotificationHandler: mutateAsync,
        isLoadingNotification: isLoading,
    };
};

export default useGetNotification;
