import React from 'react';
import { useAppStore } from '@/core/common/presentation/state/store';
import { Navigate } from 'react-router-dom';

function DashboardPage() {
  const { user } = useAppStore();

  if (!user?.emailLinked) {
    return <Navigate to="/link-email" replace />;
  }

  return <div>DashboardPage</div>;
}

export default DashboardPage;
