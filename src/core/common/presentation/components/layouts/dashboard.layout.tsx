import { AppSidebar } from '@/core/common/presentation/components/app-sidebar';
import { GlobalLoader } from '@/core/common/presentation/components/global-loader';
import PageLayout from '@/core/common/presentation/components/layouts/page.layout';
import SideHeader from '@/core/common/presentation/components/side-header';
import {
  SidebarInset,
  SidebarProvider,
} from '@/core/common/presentation/components/ui/sidebar';
import useGetUser from '@/features/user/presentation/state/hook/use-get-user';

const DashboardLayout = () => {
  const { isFetchingUser } = useGetUser();
  if (isFetchingUser) {
    return <GlobalLoader show={true} />;
  }

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
