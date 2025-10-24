import React from 'react';

import AccountHeader from "@/features/accounts/presentation/components/account-header";
import AccountTable from '@/features/accounts/presentation/components/account.table';
import AccountsCards from '@/features/accounts/presentation/components/accounts.cards';

function AccountsPage() {
  return (
    <div className="w-full flex flex-col gap-8">
        <AccountHeader/>
      <AccountsCards />
      <AccountTable />
    </div>
  );
}

export default AccountsPage;
