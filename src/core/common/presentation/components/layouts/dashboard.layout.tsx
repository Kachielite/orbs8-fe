import {AppSidebar} from '@/core/common/presentation/components/app-sidebar';
import PageLayout from '@/core/common/presentation/components/layouts/page.layout';
import SideHeader from '@/core/common/presentation/components/side-header';
import {SidebarInset, SidebarProvider,} from '@/core/common/presentation/components/ui/sidebar';

const DashboardLayout = () => {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SideHeader />
        <PageLayout />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
