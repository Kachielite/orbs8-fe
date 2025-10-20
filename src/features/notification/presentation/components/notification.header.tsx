import {Bell, CheckCheck} from 'lucide-react';
import React, {useState} from 'react';

import {CustomAlertDialogue} from '@/core/common/presentation/components/dialogue/custom-alert-dialogue';
import {Button} from '@/core/common/presentation/components/ui/button';
import useMarkAllAsRead from '@/features/notification/presentation/state/hooks/use-mark-all-as-read';

function NotificationHeader() {
    const [showDialogue, setShowDialogue] = useState(false);
    const {isMarkingAsRead, markAllAsReadHandler} = useMarkAllAsRead();
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

                <Button
                    onClick={() => setShowDialogue(true)}
                    variant="outline"
                    size="sm"
                >
                    <CheckCheck className="h-4 w-4 mr-2"/>
                    Mark all as read
                </Button>
            </div>
            <CustomAlertDialogue
                title="Mark All as Read"
                description="Are you sure you want to mark all notifications as read?"
                actionIsLoading={isMarkingAsRead}
                visibility={showDialogue}
                setVisibility={setShowDialogue}
                action={markAllAsReadHandler}
            />
        </div>
    );
}

export default NotificationHeader;
