import {useLocation} from 'react-router-dom';

import {AppSidebar} from '@/core/common/presentation/components/app-sidebar';
import {GlobalLoader} from '@/core/common/presentation/components/global-loader';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from '@/core/common/presentation/components/ui/breadcrumb';
import {Separator} from '@/core/common/presentation/components/ui/separator';
import {SidebarInset, SidebarProvider, SidebarTrigger,} from '@/core/common/presentation/components/ui/sidebar';
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
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
