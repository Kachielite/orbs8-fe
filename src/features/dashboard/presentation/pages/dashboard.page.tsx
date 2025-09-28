import React from 'react';
import {useAppStore} from '@/core/common/presentation/state/store';
import LinkEmailPage from "@/features/email/presentation/pages/link-email.page";

function DashboardPage() {
  const { user } = useAppStore();

  if (!user?.emailLinked) {
    return <LinkEmailPage/>
  }

  return <div>DashboardPage</div>;
}

export default DashboardPage;
