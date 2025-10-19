import React from 'react';
import {Navigate} from 'react-router-dom';

import {GlobalLoader} from '@/core/common/presentation/components/global-loader';
import {useAppStore} from '@/core/common/presentation/state/store';
import useGetBanks from '@/features/bank/presentation/state/hooks/use-get-banks';
import AccountSummary from '@/features/dashboard/presentation/components/account-summary';
import TransactionCards from '@/features/dashboard/presentation/components/dashboard-cards';
import DashboardHeader from '@/features/dashboard/presentation/components/dashboard-header';
import {DashboardIncomeByCategory} from '@/features/dashboard/presentation/components/dashboard-income-by-category';
import {DashboardSpendByBank} from '@/features/dashboard/presentation/components/dashboard-spend-by-bank';
import {DashboardSpendByCategory} from '@/features/dashboard/presentation/components/dashboard-spend-by-category';
import {DashboardSpendByType} from '@/features/dashboard/presentation/components/dashboard-spend-by-type';
import RecentTransactions from '@/features/dashboard/presentation/components/recent-transactions';
import TopMerchants from '@/features/dashboard/presentation/components/top-mercants';
import useGetUser from '@/features/user/presentation/state/hook/use-get-user';

function DashboardPage() {
  const { user } = useAppStore();
  const { isFetchingUser } = useGetUser();
  const { isGettingBanks } = useGetBanks();

  if (isFetchingUser || isGettingBanks) {
    return <GlobalLoader show={true} />;
  }

  if (!user?.emailLinked) {
    return <Navigate to="/link-email" replace />;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <DashboardHeader/>
      <TransactionCards />
        <div className="grid grid-cols-1 gap-4 min-h-0 xl:grid-cols-3 xl:items-stretch xl:grid-rows-1 xl:h-[600px]">
            <div className="flex flex-col h-full xl:col-span-2">
                <DashboardSpendByType/>
            </div>
        <div className="flex flex-col h-full xl:col-span-1">
            <DashboardSpendByBank/>
        </div>
        </div>
        <div className="grid grid-cols-1 gap-4 min-h-0 xl:grid-cols-2 xl:items-stretch xl:grid-rows-1 xl:max-h-[600px]">
            <div className="flex flex-col h-full xl:col-span-1">
                <DashboardIncomeByCategory/>
            </div>
            <div className="flex flex-col h-full xl:col-span-1">
                <DashboardSpendByCategory/>
        </div>
      </div>
        <div className="grid grid-cols-1 gap-4 min-h-0 xl:grid-cols-2 xl:items-stretch xl:grid-rows-1 xl:max-h-[600px]">
            <div className="flex flex-col h-full xl:col-span-1">
                <AccountSummary/>
            </div>
            <div className="flex flex-col h-full xl:col-span-1">
                <TopMerchants/>
            </div>
        </div>
        <RecentTransactions/>
    </div>
  );
}

export default DashboardPage;
