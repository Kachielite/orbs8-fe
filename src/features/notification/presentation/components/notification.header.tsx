import {Bell, CheckCheck, Trash} from 'lucide-react';
import React, {useState} from 'react';

import {CustomAlertDialogue} from '@/core/common/presentation/components/dialogue/custom-alert-dialogue';
import {Button} from '@/core/common/presentation/components/ui/button';
import useDeleteAllNotifications from '@/features/notification/presentation/state/hooks/use-delete-all-notifications';
import useMarkAllAsRead from '@/features/notification/presentation/state/hooks/use-mark-all-as-read';

function NotificationHeader() {
    const [showDialogue, setShowDialogue] = useState(false);
    const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);
    const {isMarkingAsRead, markAllAsReadHandler} = useMarkAllAsRead();
    const {isDeletingAllNotifications, deleteAllNotificationHandler} =
        useDeleteAllNotifications();
    return (
        <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-2 items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Bell className="h-6 w-6"/>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            Notifications
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => setShowDialogue(true)}
                        variant="outline"
                        size="sm"
                    >
                        <CheckCheck className="h-4 w-4 mr-2"/>
                        Mark all as read
                    </Button>
                    <Button
                        onClick={() => setShowDeleteDialogue(true)}
                        variant="outline"
                        size="sm"
                        className="text-red-500"
                    >
                        <Trash className="h-4 w-4 mr-2"/>
                        Delete all
                    </Button>
                </div>
            </div>
            <CustomAlertDialogue
                title="Mark All as Read"
                description="Are you sure you want to mark all notifications as read?"
                actionIsLoading={isMarkingAsRead}
                visibility={showDialogue}
                setVisibility={setShowDialogue}
                action={markAllAsReadHandler}
            />
            <CustomAlertDialogue
                title="Delete All Notifications"
                description="Are you sure you want to delete all notifications? This action cannot be undone."
                actionIsLoading={isDeletingAllNotifications}
                visibility={showDeleteDialogue}
                setVisibility={setShowDeleteDialogue}
                action={deleteAllNotificationHandler}
            />
        </div>
    );
}

export default NotificationHeader;
