import React from 'react';

import ExchangeRate from '@/features/accounts/presentation/components/exchange-rate';
import TransactionTable from '@/features/transactions/presentation/components/transaction-table';
import TransactionCards from '@/features/transactions/presentation/components/transaction.cards';

function TransactionsPage() {
  return (
    <div className="w-full flex flex-col gap-8">
      <ExchangeRate />
      <TransactionCards />
      <TransactionTable />
    </div>
  );
}

export default TransactionsPage;
