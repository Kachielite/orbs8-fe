import React from 'react';

import AccountTable from '@/features/accounts/presentation/components/account.table';
import AccountsCards from '@/features/accounts/presentation/components/accounts.cards';
import ExchangeRate from '@/features/accounts/presentation/components/exchange-rate';

function AccountsPage() {
  return (
    <div className="w-full flex flex-col gap-8">
      <ExchangeRate />
      <AccountsCards />
      <AccountTable />
    </div>
  );
}

export default AccountsPage;
