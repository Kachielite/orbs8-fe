import React from 'react'
import {useLocation} from "react-router-dom";

import {ModeToggle} from "@/core/common/presentation/components/mode-toggle";
import NotificationToggle from "@/core/common/presentation/components/notification-toggle";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage
} from "@/core/common/presentation/components/ui/breadcrumb";
import {Separator} from "@/core/common/presentation/components/ui/separator";
import {SidebarTrigger} from "@/core/common/presentation/components/ui/sidebar";


function SideHeader() {
      const location = useLocation();
  const { pathname } = location;
  const getPageName = () => {
    switch (pathname) {
      case '/':
        return 'Dashboard';
      case '/transactions':
        return 'Transactions';
      case '/accounts':
        return 'Accounts';
      case '/insights':
        return 'Insights';
      case '/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

    return (
               <header className="flex h-16 pt-2.5 shrink-0 items-start gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>{getPageName()}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="ml-auto flex items-center gap-2">
                <NotificationToggle/>
              <ModeToggle />
            </div>
          </div>
        </header>
    )
}

export default SideHeader
