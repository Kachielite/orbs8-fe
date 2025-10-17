import {useState} from 'react';
import {useQuery} from 'react-query';
import {toast} from 'sonner';

import useDebounce from '@/core/common/presentation/state/context/use-debounce';
import {useAppStore} from '@/core/common/presentation/state/store';
import {extractErrorHooks} from '@/core/helpers/extract-error-hooks';
import {TransactionType} from '@/features/transactions/domain/entity/enum/transaction-type.enum';
import {ITransactionQuery} from '@/features/transactions/domain/entity/interface/transactions.interface';
import {getTransactionsEffect} from '@/features/transactions/presentation/state/store/effects';

const useGetTransactions = () => {
  const { setTransactions, transactionStartDate, transactionEndDate } =
    useAppStore();
  const [transactionType, setTransactionType] = useState<
    TransactionType | undefined
  >(undefined);
  const [categoryIds, setCategoryIds] = useState<number[] | undefined>(
    undefined
  );
  const [accountIds, setAccountIds] = useState<number[] | undefined>(undefined);
  const [bankIds, setBankIds] = useState<number[] | undefined>(undefined);
  const [sortBy, setSortBy] = useState<
    'date' | 'amount' | 'createdAt' | undefined
  >(undefined);
  const [orderBy, setOrderBy] = useState<'asc' | 'desc' | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);

  const debouncedSearchTerm = useDebounce(search, 400);

  const handleUpdateQuery = (
    type: string,
    value: string | number | number[] | undefined
  ) => {
    switch (type) {
      case 'transactionType':
        setTransactionType(value as TransactionType);
        break;
      case 'categoryIds':
        setCategoryIds(value as unknown as number[]);
        break;
      case 'accountIds':
        setAccountIds(value as unknown as number[]);
        break;
      case 'bankIds':
        setBankIds(value as unknown as number[]);
        break;
      case 'sortBy':
        setSortBy(value as 'date' | 'amount' | 'createdAt');
        break;
      case 'orderBy':
        setOrderBy(value as 'asc' | 'desc');
        break;
      case 'search':
        setSearch(value as string);
        break;
      case 'page':
        setPage(value as number);
        break;
      case 'limit':
        setLimit(value as number);
        break;
      default:
        break;
    }
  };

  const query: ITransactionQuery = {
    page,
    limit,
      ...(transactionStartDate && { startDate: transactionStartDate }),
      ...(transactionEndDate && { endDate: transactionEndDate }),
    ...(transactionType && { transactionType }),
    ...(categoryIds && { categoryIds }),
    ...(accountIds && { accountIds }),
    ...(bankIds && { bankIds }),
    ...(sortBy && { sortBy }),
    ...(orderBy && { orderBy }),
    ...(debouncedSearchTerm && { search: debouncedSearchTerm }),
  };

  const {
    isLoading: isGettingTransactions,
  } = useQuery(
    ['transactions', query, transactionStartDate, transactionEndDate],
    async () => {
      return getTransactionsEffect(query);
    },
    {
      onSuccess: transactions => {
        setTransactions(transactions);
      },
      onError: error => {
        const errorMessage = extractErrorHooks(error, 'useGetTransactions');
        toast.error(errorMessage);
      },
    }
  );

  return {
    isGettingTransactions,
      handleUpdateQuery,
      transactionType,
      categoryIds,
      accountIds,
      bankIds,
      sortBy,
      orderBy,
      search,
      page,
      limit,
  };
};

export default useGetTransactions;
