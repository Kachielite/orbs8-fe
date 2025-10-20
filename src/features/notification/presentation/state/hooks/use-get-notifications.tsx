import {useMemo, useState} from 'react';
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
    const [isRead, setIsRead] = useState<boolean | undefined>(undefined);

    const handleUpdateQuery = (
        type: string,
        value: boolean | number | undefined
    ) => {
        console.log("type: ", type)
        switch (type) {
            case 'page':
                setPage(Number(value));
                break;
            case 'limit':
                setLimit(Number(value));
                break;
            case 'isRead':
                setIsRead(value as boolean | undefined);
                break;
            default:
                break;
        }
    };


    const query = useMemo<INotificationQuery>(
        () => ({
            page,
            limit,
            isRead,
        }),
        [page, limit, isRead]
    );

    const {data, isLoading, error} = useQuery(
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
        notifications: data,
        isLoadingNotifications: isLoading,
        notificationsError: error,
        handleUpdateQuery,
        query,
    };
};

export default useGetNotifications;
