import {Activity, AlertCircle, CheckCircle2, Clock, Loader2, Trash} from "lucide-react";
import moment from "moment";

import {Badge} from "@/core/common/presentation/components/ui/badge";
import {Button} from "@/core/common/presentation/components/ui/button";
import {Card} from "@/core/common/presentation/components/ui/card";
import {cn} from "@/core/lib/utils";
import {NotificationType} from "@/features/notification/domain/entity/enum/notification-type.enum";
import {NotificationEntity} from "@/features/notification/domain/entity/notification.entity";
import useDeleteNotification from "@/features/notification/presentation/state/hooks/use-delete-notification";
import useMarkAsRead from "@/features/notification/presentation/state/hooks/use-mark-as-read";

interface NotificationCardProps {
    notification: NotificationEntity;
}

const notificationConfig = {
    [NotificationType.SYNC_STARTED]: {
        icon: Activity,
        color: "notification-started",
        label: "Started",
    },
    [NotificationType.SYNC_PROGRESS]: {
        icon: Loader2,
        color: "notification-progress",
        label: "In Progress",
    },
    [NotificationType.SYNC_COMPLETED]: {
        icon: CheckCircle2,
        color: "notification-completed",
        label: "Completed",
    },
    [NotificationType.SYNC_FAILED]: {
        icon: AlertCircle,
        color: "notification-failed",
        label: "Failed",
    },
};

export const NotificationCard = ({notification}: NotificationCardProps) => {
    const {isMarkingAsRead, markAsReadHandler} = useMarkAsRead();
    const {isDeletingNotification, deleteNotificationHandler} = useDeleteNotification();
    const config = notificationConfig[notification.type];
    const Icon = config.icon;

    const timeAgo = moment(notification.date).fromNow();

    return (
        <Card
            className={cn(
                "p-4 transition-all hover:shadow-md mb-6",
                notification.isRead ? "bg-card opacity-70" : "bg-card border-l-4"
            )}
            style={{
                borderLeftColor: notification.isRead ? undefined : `hsl(var(--notification-${config.color.split('-')[1]}))`
            }}
        >
            <div className="flex items-start gap-4">
                <div
                    className={cn(
                        "p-2 rounded-full shrink-0",
                        notification.type === NotificationType.SYNC_PROGRESS && "animate-pulse"
                    )}
                    style={{backgroundColor: `hsl(var(--notification-${config.color.split('-')[1]}) / 0.1)`}}
                >
                    <Icon
                        className={cn(
                            "h-5 w-5",
                            notification.type === NotificationType.SYNC_PROGRESS && "animate-spin"
                        )}
                        style={{color: `hsl(var(--notification-${config.color.split('-')[1]}))`}}
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className={cn(
                            "text-sm font-semibold",
                            notification.isRead ? "text-muted-foreground" : "text-foreground"
                        )}>
                            {notification.title}
                        </h3>
                        <Badge
                            variant="secondary"
                            className="shrink-0"
                            style={{
                                backgroundColor: `hsl(var(--notification-${config.color.split('-')[1]}) / 0.1)`,
                                color: `hsl(var(--notification-${config.color.split('-')[1]}))`
                            }}
                        >
                            {config.label}
                        </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">
                        {notification.description}
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3"/>
                            {timeAgo}
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsReadHandler(notification.id)}
                            className="h-7 text-xs"
                        >
                            {isMarkingAsRead ? 'Loading...' : !notification.isRead && (
                                <>
                                    <CheckCircle2 className="h-3 w-3 mr-1"/>
                                    Mark read
                                </>
                            )}
                        </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteNotificationHandler(notification.id)}
                                className="h-7 text-xs text-red-500"
                            >
                                {isDeletingNotification ? 'Deleting...' : (
                                    <>
                                        <Trash className="h-3 w-3 mr-1"/>
                                        Delete
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};