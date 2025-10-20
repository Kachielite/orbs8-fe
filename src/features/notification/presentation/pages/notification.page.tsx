import React from 'react';

import NotificationHeader from '@/features/notification/presentation/components/notification.header';
import NotificationTabs from '@/features/notification/presentation/components/notification.tabs';
import useGetNotifications from '@/features/notification/presentation/state/hooks/use-get-notifications';

function NotificationPage() {
    const {isLoadingNotifications, handleUpdateQuery} = useGetNotifications();

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <NotificationHeader/>
            <NotificationTabs handleUpdateQuery={handleUpdateQuery}/>
        </div>
    );
}

export default NotificationPage;
