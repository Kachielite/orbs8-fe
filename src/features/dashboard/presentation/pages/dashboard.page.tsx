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

  return <div>dashboard</div>;
}

export default DashboardPage;
