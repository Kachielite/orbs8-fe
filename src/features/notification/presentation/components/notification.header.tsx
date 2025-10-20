import {Bell, CheckCheck} from 'lucide-react';
import React from 'react';

import {Button} from '@/core/common/presentation/components/ui/button';

function NotificationHeader() {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Bell className="h-6 w-6 text-primary"/>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            Notifications
                        </h1>
                    </div>
                </div>

                <Button
                    onClick={() => console.log('clicked')}
                    variant="outline"
                    size="sm"
                >
                    <CheckCheck className="h-4 w-4 mr-2"/>
                    Mark all as read
                </Button>
            </div>
        </div>
    );
}

export default NotificationHeader;
