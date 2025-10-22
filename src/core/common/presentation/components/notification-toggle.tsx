import {Bell} from 'lucide-react';
import React from 'react';
import {useNavigate} from 'react-router-dom';

import EmptyState from '@/core/common/presentation/components/empty-state';
import {Button} from '@/core/common/presentation/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/core/common/presentation/components/ui/dropdown-menu';
import {NotificationEntity} from '@/features/notification/domain/entity/notification.entity';
import {NotificationCardMini} from '@/features/notification/presentation/components/notification.card-mini';
import useGetNotifications from "@/features/notification/presentation/state/hooks/use-get-notifications";

function NotificationToggle() {
    const {notifications} = useGetNotifications();
    const navigate = useNavigate();

    // notifications from the hook are paginated: Pagination<NotificationEntity>
    const notificationsList: NotificationEntity[] = notifications?.data ?? [];

    // only unread notifications
    const unreadNotifications = notificationsList.filter(n => !n.isRead);
    const unreadCount = unreadNotifications.length;
    const visibleNotifications = unreadNotifications.slice(0, 6);
    const moreCount = Math.max(0, unreadNotifications.length - visibleNotifications.length);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="size-7 relative">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {unreadCount > 0 && (
              <span
                  className="absolute -top-1 -right-1 h-4 w-4 p-1 flex items-center justify-center text-[0.6rem] bg-red-500 text-white rounded-full">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Toggle Notification</span>
        </Button>
      </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[20rem] lg:w-[30rem]">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
          {visibleNotifications.map(notification => (
              <DropdownMenuItem key={notification.id} className="p-0">
                  <NotificationCardMini notification={notification}/>
              </DropdownMenuItem>
          ))}
          {moreCount > 0 && (
              <DropdownMenuItem className="justify-center text-sm text-muted-foreground"
                                onClick={() => navigate('/notifications')}>
                  +{moreCount} more
              </DropdownMenuItem>
          )}

          {unreadNotifications.length === 0 && (
              <div className="p-4 w-[20rem] mx-auto">
                  <EmptyState
                      title="No new notifications"
                      description="You're all caught up"
                  />
              </div>
          )}

          <DropdownMenuSeparator/>
          <DropdownMenuItem className="justify-center font-medium" onClick={() => navigate('/notifications')}>
              View all
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NotificationToggle;
