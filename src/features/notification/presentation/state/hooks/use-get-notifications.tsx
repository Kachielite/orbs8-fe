import {useState} from 'react';
import {useQuery} from 'react-query';
import {toast} from 'sonner';

import {useAppStore} from '@/core/common/presentation/state/store';
import {extractErrorHooks} from '@/core/helpers/extract-error-hooks';
import {INotificationQuery} from '@/features/notification/domain/entity/interface/notification.interface';
import {getNotificationsEffect} from '@/features/notification/presentation/state/store/effects';

const useGetNotifications = () => {
    const {setNotifications} = useAppStore();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [isRead, setIsRead] = useState(false);

    const handleUpdateQuery = (
        type: string,
        value: string | number | undefined
    ) => {
        switch (type) {
            case 'page':
                setPage(Number(value));
                break;
            case 'limit':
                setLimit(Number(value));
                break;
            case 'isRead':
                setIsRead(Boolean(value));
                break;
            default:
                break;
        }
    };

    const query: INotificationQuery = {
        page,
        limit,
        ...(isRead && {
            isRead,
        }),
    };

    const {isLoading} = useQuery(
        ['notifications', query],
        () => getNotificationsEffect(query),
        {
            onSuccess: data => {
                setNotifications(data);
            },
            onError: error => {
                const errorMessage = extractErrorHooks(error, 'useGetNotifications');
                toast.error(errorMessage);
            },
        }
    );

    return {
        isLoadingNotifications: isLoading,
        handleUpdateQuery,
    };
};

export default useGetNotifications;
