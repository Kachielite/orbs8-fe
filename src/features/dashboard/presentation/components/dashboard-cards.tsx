import {CreditCard, DollarSign, Receipt, TrendingUp} from 'lucide-react';
import React from 'react';

import DashboardCard, {DashboardCardData,} from '@/core/common/presentation/components/dashboard-card';
import CardLoaders from '@/core/common/presentation/components/loaders/card-loader';
import {useAppStore} from '@/core/common/presentation/state/store';
import useDashboardTransactionsSummary
    from '@/features/dashboard/presentation/state/hooks/use-dashboard-transactions-summary';

function TransactionCards() {
    const {dashboardTransactionsSummary, user} = useAppStore();
  const { isGettingTransactionSummary } = useDashboardTransactionsSummary();

    const isLoading = isGettingTransactionSummary;

    const income = dashboardTransactionsSummary?.totalIncome || 0;
    const spend = dashboardTransactionsSummary?.totalSpend || 0;
    const currentMonthIncome =
        dashboardTransactionsSummary?.currentMonthIncome || 0;
    const currentMonthSpend =
        dashboardTransactionsSummary?.currentMonthSpend || 0;
    const lastMonthIncome = dashboardTransactionsSummary?.lastMonthIncome || 0;
    const lastMonthSpend = dashboardTransactionsSummary?.lastMonthSpend || 0;

    const netBalance = income - spend;
    const spendChange =
        lastMonthSpend === 0
            ? 0
            : ((currentMonthSpend - lastMonthSpend) / lastMonthSpend) * 100;
    const incomeChange =
        lastMonthIncome === 0
            ? 0
            : ((currentMonthIncome - lastMonthIncome) / lastMonthIncome) * 100;

    const cardData: DashboardCardData[] = [
    {
        name: 'Total Income',
        description: '',
        count: income,
        icon: DollarSign,
        prefix: user?.preferredCurrency || '$',
        change: incomeChange,
        metricType: 'income',
        valueColorType: 'neutral',
        tooltip: 'All time total income across all accounts',
    },
    {
        name: 'Total Spend',
        description: '',
        count: spend,
        icon: CreditCard,
        prefix: user?.preferredCurrency || '$',
        change: spendChange,
        metricType: 'spend',
        valueColorType: 'neutral',
        tooltip: 'All time total spend across all accounts',
    },
    {
        name: 'Net Balance',
        description: 'Income minus spend',
        count: netBalance,
        icon: TrendingUp,
        prefix: user?.preferredCurrency || '$',
        valueColorType: 'balance',
    },
    {
        name: 'Transactions',
        description: 'Total this period',
        count: dashboardTransactionsSummary?.totalTransactions || 0,
        icon: Receipt,
        valueColorType: 'neutral',
    },
  ];
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:grid-cols-4 md:grid-cols-2">
      {isLoading ? (
        <CardLoaders count={4} />
      ) : (
          cardData.map((card, index) => <DashboardCard key={index} card={card}/>)
      )}
    </div>
  );
}

export default TransactionCards;
