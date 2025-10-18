import React from 'react';
import {Navigate} from 'react-router-dom';

import {GlobalLoader} from '@/core/common/presentation/components/global-loader';
import {useAppStore} from '@/core/common/presentation/state/store';
import useGetBanks from "@/features/bank/presentation/state/hooks/use-get-banks";
import TransactionCards from '@/features/dashboard/presentation/components/dashboard-cards';
import {DashboardSpendByBank} from "@/features/dashboard/presentation/components/dashboard-spend-by-bank";
import {DashboardSpendByCategory} from '@/features/dashboard/presentation/components/dashboard-spend-by-category';
import {DashboardSpendByType} from '@/features/dashboard/presentation/components/dashboard-spend-by-type';
import useGetUser from '@/features/user/presentation/state/hook/use-get-user';

function DashboardPage() {
  const { user } = useAppStore();
  const { isFetchingUser } = useGetUser();
  const {isGettingBanks} = useGetBanks();

  if (isFetchingUser || isGettingBanks) {
    return <GlobalLoader show={true} />;
  }

  if (!user?.emailLinked) {
    return <Navigate to="/link-email" replace />;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <TransactionCards />
      <div className="grid grid-cols-1 gap-4 min-h-0 xl:grid-cols-3 xl:items-stretch xl:grid-rows-1 xl:h-fit">
        <div className="flex flex-col h-full xl:col-span-1">
          <DashboardSpendByCategory />
        </div>
        <div className="flex flex-col h-full xl:col-span-2">
          <DashboardSpendByType />
        </div>
      </div>
       <div className="grid grid-cols-1 gap-4 min-h-0 xl:grid-cols-2 xl:items-stretch xl:grid-rows-1 xl:h-[700px]">
            <div className="flex flex-col h-full xl:col-span-1">
              <DashboardSpendByBank />
            </div>
            <div className="flex flex-col h-full xl:col-span-1">
              Chart
            </div>
          </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  );
}

export default DashboardPage;
