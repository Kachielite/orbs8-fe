import React from 'react';

import {ScrollArea} from "@/core/common/presentation/components/ui/scroll-area";
import {useAppStore} from "@/core/common/presentation/state/store";
import {NotificationCard} from "@/features/notification/presentation/components/notification.card";
import {NotificationCardLoader} from "@/features/notification/presentation/components/notification.card-loader";
import NotificationHeader from '@/features/notification/presentation/components/notification.header';
import NotificationTabs from '@/features/notification/presentation/components/notification.tabs';
import useGetNotifications from '@/features/notification/presentation/state/hooks/use-get-notifications';

function NotificationPage() {
    const {isLoadingNotifications, handleUpdateQuery} = useGetNotifications();
    const {notifications} = useAppStore();

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <NotificationHeader/>
            <NotificationTabs handleUpdateQuery={handleUpdateQuery}/>
            {isLoadingNotifications ? <NotificationCardLoader count={6}/> :
                <ScrollArea className="h-[calc(100vh-280px)]">
                    {notifications?.data.map(notification => <NotificationCard key={notification.id}
                                                                               notification={notification}/>)}
                </ScrollArea>
            }
        </div>
    );
}

export default NotificationPage;
