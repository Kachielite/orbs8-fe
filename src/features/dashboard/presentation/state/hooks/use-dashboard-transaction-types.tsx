import { useQuery } from 'react-query';
import { toast } from 'sonner';

import { useAppStore } from '@/core/common/presentation/state/store';
import { extractErrorHooks } from '@/core/helpers/extract-error-hooks';
import { TransactionType } from '@/features/transactions/domain/entity/enum/transaction-type.enum';
import { ITransactionQuery } from '@/features/transactions/domain/entity/interface/transactions.interface';
import { getTransactionsEffect } from '@/features/transactions/presentation/state/store/effects';

const useDashboardTransactionTypes = () => {
  const {
    dashboardStartDate,
    dashboardEndDate,
    setDashboardTransactionsByTypes,
  } = useAppStore();

  const query: ITransactionQuery = {
    page: 1,
    limit: 100,
    startDate: dashboardStartDate,
    endDate: dashboardEndDate,
  };

  const { isLoading: isGettingTransactionsByType } = useQuery(
    ['transactions-by-type', query, dashboardStartDate, dashboardEndDate],
    async () => {
      const creditTransactions = await getTransactionsEffect({
        ...query,
        transactionType: TransactionType.CREDIT,
      });
      const debitTransactions = await getTransactionsEffect({
        ...query,
        transactionType: TransactionType.DEBIT,
      });
      return {
        credit: creditTransactions.data,
        debit: debitTransactions.data,
      };
    },
    {
      onSuccess: data => {
        setDashboardTransactionsByTypes(data);
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
    isGettingTransactionsByType,
  };
};

export default useDashboardTransactionTypes;
