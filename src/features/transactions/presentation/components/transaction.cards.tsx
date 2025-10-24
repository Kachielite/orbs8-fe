import {BanknoteArrowDown, BanknoteArrowUp, FolderSync, ReceiptText,} from 'lucide-react';
import moment from 'moment';
import React from 'react';

import CardLoaders from '@/core/common/presentation/components/loaders/card-loader';
import StatsCard, {StatsCardData,} from '@/core/common/presentation/components/stats-card';
import {useAppStore} from '@/core/common/presentation/state/store';
import useGetSyncStatus from '@/features/email/presentation/state/hooks/use-get-sync-status';
import useGetTransactionSummary from '@/features/transactions/presentation/state/hooks/use-get-transaction-summary';

function TransactionCards() {
  const { transactionSummary, syncStatus, user } = useAppStore();
  const { isGettingTransactionSummary } = useGetTransactionSummary();
  const { isGettingEmailSyncStatus } = useGetSyncStatus();

  const isLoading = isGettingTransactionSummary || isGettingEmailSyncStatus;

  const cardData: StatsCardData[] = [
    {
      name: 'Total Income',
        description: 'Income across all accounts within the selected date range',
      count: `${user?.preferredCurrency || 'USD'} ${transactionSummary?.totalIncome.toLocaleString() || 0}`,
      icon: BanknoteArrowUp,
    },
    {
      name: 'Total Spend',
        description: 'Spend across all accounts within the selected date range',
      count: `${user?.preferredCurrency || 'USD'} ${transactionSummary?.totalSpend.toLocaleString() || 0}`,
      icon: BanknoteArrowDown,
    },
    {
      name: 'Total Transactions',
        description: 'Number of transactions across all accounts within the selected date range',
      count: transactionSummary?.totalTransactions || 0,
        icon: ReceiptText,
    },
    {
      name: 'Last Sync',
      description: 'Last transaction sync status',
      count: syncStatus?.lastSyncAt
        ? moment(syncStatus.lastSyncAt).format('DD/MM/YYYY')
        : 'Never',
      icon: FolderSync,
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
