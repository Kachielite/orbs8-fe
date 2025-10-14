import {Bell} from "lucide-react";
import React from 'react'

import {Button} from "@/core/common/presentation/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/core/common/presentation/components/ui/dropdown-menu";

function NotificationToggle() {
    const notifications = [
        { id: 1, title: "New transaction received", message: "You have received $500 from John Doe" },
        { id: 2, title: "Account update", message: "Your account balance has been updated" },
        { id: 3, title: "Security alert", message: "Unusual login detected" },
    ];
    const unreadCount = notifications.length; // For demo, all are unread

    return (
            <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="size-7 relative">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs bg-red-500 text-white rounded-full">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Toggle Notification</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-4">
            <div className="font-medium">{notification.title}</div>
            <div className="text-sm text-muted-foreground">{notification.message}</div>
          </DropdownMenuItem>
        ))}
        {notifications.length === 0 && (
          <DropdownMenuItem disabled>No new notifications</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
    )
}

export default NotificationToggle
