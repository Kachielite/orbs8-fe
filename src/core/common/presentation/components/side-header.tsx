import React from 'react';

import {ModeToggle} from '@/core/common/presentation/components/mode-toggle';
import NotificationToggle from '@/core/common/presentation/components/notification-toggle';
import {SidebarTrigger} from '@/core/common/presentation/components/ui/sidebar';

function SideHeader() {
  return (
    <header className="flex h-16 pt-2.5 shrink-0 items-start gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4 w-full">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <NotificationToggle />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export default SideHeader;
