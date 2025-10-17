import React from 'react';

import ExchangeRate from "@/features/accounts/presentation/components/exchange-rate";
import TransactionCards from "@/features/transactions/presentation/components/transaction.cards";

function TransactionsPage() {
  return (
    <div className="w-full flex flex-col gap-8">
        <ExchangeRate/>
      <TransactionCards />
    </div>
  );
}

export default TransactionsPage;
