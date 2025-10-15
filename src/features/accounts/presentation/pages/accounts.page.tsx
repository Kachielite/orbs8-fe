import React from 'react';

import AccountsCards from '@/features/accounts/presentation/components/accounts.cards';

function AccountsPage() {
  return (
    <div className="w-full flex flex-col gap-4">
      <AccountsCards />
    </div>
  );
}

export default AccountsPage;
