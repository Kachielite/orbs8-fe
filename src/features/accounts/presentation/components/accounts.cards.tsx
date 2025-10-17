import { FileUser, Landmark, Wallet } from 'lucide-react';
import React from 'react';

import CardLoaders from '@/core/common/presentation/components/loaders/card-loader';
import StatsCard, {
  StatsCardData,
} from '@/core/common/presentation/components/stats-card';
import { useAppStore } from '@/core/common/presentation/state/store';
import useGetAccountSummary from '@/features/accounts/presentation/state/hooks/use-get-account-summary';

function AccountsCards() {
  const { accountSummary, user } = useAppStore();
  const { isGettingAccountSummary } = useGetAccountSummary();

  const cardData: StatsCardData[] = [
    {
      name: 'Total Balance',
      description: 'Balance across all accounts',
      count: `${user?.preferredCurrency || 'USD'} ${accountSummary?.totalBalance.toLocaleString() || 0}`,
      icon: Wallet,
    },
    {
      name: 'Number of Accounts',
      description: 'Total linked accounts',
      count: accountSummary?.numberOfAccounts || 0,
      icon: FileUser,
    },
    {
      name: 'Number of Banks',
      description: 'Banks your accounts are connected to',
      count: accountSummary?.numberOfBanks || 0,
      icon: Landmark,
    },
  ];

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:grid-cols-3">
      {isGettingAccountSummary ? (
        <CardLoaders count={3} />
      ) : (
        cardData.map((card, index) => <StatsCard key={index} card={card} />)
      )}
    </div>
  );
}

export default AccountsCards;
