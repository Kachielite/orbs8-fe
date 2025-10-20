import {Activity, AlertCircle, CheckCircle2, Clock, Loader2, LucideIcon} from 'lucide-react';
import moment from 'moment';
import React from 'react';

import {Card} from '@/core/common/presentation/components/ui/card';
import {cn} from '@/core/lib/utils';
import {NotificationType} from '@/features/notification/domain/entity/enum/notification-type.enum';
import {NotificationEntity} from '@/features/notification/domain/entity/notification.entity';

interface NotificationCardMiniProps {
    notification: NotificationEntity;
}

export const NotificationCardMini = ({notification}: NotificationCardMiniProps) => {
    const notificationConfig: Record<NotificationType, { icon: LucideIcon; color: string }> = {
        [NotificationType.SYNC_STARTED]: {icon: Activity, color: 'notification-started'},
        [NotificationType.SYNC_PROGRESS]: {icon: Loader2, color: 'notification-progress'},
        [NotificationType.SYNC_COMPLETED]: {icon: CheckCircle2, color: 'notification-completed'},
        [NotificationType.SYNC_FAILED]: {icon: AlertCircle, color: 'notification-failed'},
    };

    const config = notificationConfig[notification.type];
    const Icon = config.icon;
    const timeAgo = moment(notification.date).fromNow();

    return (
        <Card
            className={cn(
                'w-full p-3 transition-all hover:shadow-md mb-2 rounded-none',
                notification.isRead ? 'bg-card opacity-80' : 'bg-card border-l-4'
            )}
            style={{
                borderLeftColor: notification.isRead
                    ? undefined
                    : `hsl(var(--notification-${config.color.split('-')[1]}))`,
            }}
        >
            <div className="flex items-center gap-3">
                <div
                    className="p-2 rounded-full shrink-0"
                    style={{backgroundColor: `hsl(var(--notification-${config.color.split('-')[1]}) / 0.1)`}}
                >
                    <Icon
                        className={cn('h-2.5 w-2.5', notification.type === NotificationType.SYNC_PROGRESS && 'animate-spin')}
                        style={{color: `hsl(var(--notification-${config.color.split('-')[1]}))`}}
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <div
                            className={cn('text-xs font-medium truncate', notification.isRead ? 'text-muted-foreground' : 'text-foreground')}>
                            {notification.title}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                            <Clock className="h-2 w-2"/>
                            <span>{timeAgo}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};
