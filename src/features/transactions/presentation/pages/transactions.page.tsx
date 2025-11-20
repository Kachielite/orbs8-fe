import React from 'react';

import TransactionHeader from '@/features/transactions/presentation/components/transaction-header';
import TransactionTable from '@/features/transactions/presentation/components/transaction-table';
import TransactionCards from '@/features/transactions/presentation/components/transaction.cards';

function TransactionsPage() {
  return (
      <div className="w-full flex flex-col gap-4">
          <TransactionHeader/>
      <TransactionCards />
      <TransactionTable />
    </div>
  );
}

export default TransactionsPage;
