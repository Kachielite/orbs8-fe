import { useQuery } from 'react-query';
import { toast } from 'sonner';

import { useAppStore } from '@/core/common/presentation/state/store';
import { extractErrorHooks } from '@/core/helpers/extract-error-hooks';
import { BankEntity } from '@/features/bank/domain/entity/bank.entity';
import { TransactionType } from '@/features/transactions/domain/entity/enum/transaction-type.enum';
import { ITransactionQuery } from '@/features/transactions/domain/entity/interface/transactions.interface';
import { getTransactionsEffect } from '@/features/transactions/presentation/state/store/effects';

const useDashboardTransactionsByBank = () => {
  const {
    dashboardStartDate,
    dashboardEndDate,
    setDashboardSpendingByBanks,
    banks,
  } = useAppStore();

  const query: ITransactionQuery = {
    page: 1,
    limit: 100,
    startDate: dashboardStartDate,
    endDate: dashboardEndDate,
    transactionType: TransactionType.DEBIT,
  };

  const { isLoading: isGettingTransactionsByBank } = useQuery(
    ['transactions-by-bank', query, dashboardStartDate, dashboardEndDate],
    async () => {
      const transactionByBanks = [];
      for (const bank of banks as BankEntity[]) {
        const transaction = await getTransactionsEffect({
          ...query,
          bankIds: [bank.id],
        });
        const bankName = bank.name;
        transactionByBanks.push({ bankName, transactions: transaction.data });
      }

      return transactionByBanks;
    },
    {
      onSuccess: data => {
        setDashboardSpendingByBanks(data);
      },
      onError: error => {
        const errorMessage = extractErrorHooks(
          error,
          'useDashboardTransactionTypes'
        );
        toast.error(errorMessage);
      },
    }
  );

  return {
    isGettingTransactionsByBank,
  };
};

export default useDashboardTransactionsByBank;
