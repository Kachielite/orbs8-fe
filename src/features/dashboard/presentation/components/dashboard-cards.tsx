import {Building2, Database, RefreshCcw, Wallet,} from 'lucide-react';
import moment from 'moment';
import React from 'react';

import CardLoaders from '@/core/common/presentation/components/loaders/card-loader';
import StatsCard, {StatsCardData,} from '@/core/common/presentation/components/stats-card';
import {useAppStore} from '@/core/common/presentation/state/store';
import useGetAccountSummary from "@/features/accounts/presentation/state/hooks/use-get-account-summary";
import useDashboardTransactionsSummary
    from "@/features/dashboard/presentation/state/hooks/use-dashboard-transactions-summary";
import useGetSyncStatus from "@/features/email/presentation/state/hooks/use-get-sync-status";

function TransactionCards() {
  const { dashboardTransactionsSummary, syncStatus, user, accountSummary } = useAppStore();
  const {isGettingAccountSummary} = useGetAccountSummary();
  const {isGettingTransactionSummary} = useDashboardTransactionsSummary();
  const {isGettingEmailSyncStatus} = useGetSyncStatus();

  const isLoading = isGettingAccountSummary || isGettingTransactionSummary || isGettingEmailSyncStatus;

  const cardData: StatsCardData[] = [
    {
      name: 'Total Balance',
      description: 'Sum of balances across all accounts (grouped by currency)',
      count: `${user?.preferredCurrency || 'USD'} ${accountSummary?.totalBalance.toLocaleString() || 0}`,
      icon: Wallet,
    },
    {
      name: 'Total Transactions Synced',
      description: 'Total number of transactions extracted from emails.',
      count: dashboardTransactionsSummary?.totalTransactions.toLocaleString() || 0,
      icon: Database,
    },
    {
      name: 'Connected Banks',
      description: 'Count of unique banks linked.',
      count: accountSummary?.numberOfBanks || 0,
      icon: Building2,
    },
    {
      name: 'Last Sync',
      description: 'Show the last time your data was synced.',
      count: syncStatus?.lastSyncAt
        ? moment(syncStatus.lastSyncAt).format('DD/MM/YYYY')
        : 'Never',
      icon: RefreshCcw,
    },
  ];
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:grid-cols-4 md:grid-cols-2">
      {isLoading ? (
        <CardLoaders count={4} />
      ) : (
        cardData.map((card, index) => <StatsCard key={index} card={card} />)
      )}
    </div>
  );
}

export default TransactionCards;
