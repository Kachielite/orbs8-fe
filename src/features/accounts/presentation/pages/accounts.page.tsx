import React from 'react';

import AccountsCards from '@/features/accounts/presentation/components/accounts.cards';
import ExchangeRate from "@/features/accounts/presentation/components/exchange-rate";

function AccountsPage() {
  return (
    <div className="w-full flex flex-col gap-4">
        <ExchangeRate/>
      <AccountsCards />
    </div>
  );
}

export default AccountsPage;
