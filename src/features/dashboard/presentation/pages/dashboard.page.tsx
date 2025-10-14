import React from 'react';
import {Navigate} from 'react-router-dom';

import {GlobalLoader} from '@/core/common/presentation/components/global-loader';
import {useAppStore} from '@/core/common/presentation/state/store';
import useGetUser from '@/features/user/presentation/state/hook/use-get-user';

function DashboardPage() {
  const { user } = useAppStore();
  const { isFetchingUser } = useGetUser();

  if (isFetchingUser) {
    return <GlobalLoader show={true} />;
  }

  if (!user?.emailLinked) {
    return <Navigate to="/link-email" replace />;
  }

  return (
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
  )
}

export default DashboardPage;
