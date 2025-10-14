import { useLocation } from 'react-router-dom';

import { AppSidebar } from '@/core/common/presentation/components/app-sidebar';
import { GlobalLoader } from '@/core/common/presentation/components/global-loader';
import PageLayout from '@/core/common/presentation/components/layouts/page.layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/core/common/presentation/components/ui/breadcrumb';
import { Separator } from '@/core/common/presentation/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/core/common/presentation/components/ui/sidebar';
import useGetUser from '@/features/user/presentation/state/hook/use-get-user';

const DashboardLayout = () => {
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

  const { isFetchingUser } = useGetUser();
  if (isFetchingUser) {
    return <GlobalLoader show={true} />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
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
        </header>
        <PageLayout />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
