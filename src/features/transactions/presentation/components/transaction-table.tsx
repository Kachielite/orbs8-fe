import {ChevronDown, ChevronsUpDown, ChevronUp, Receipt} from 'lucide-react';
import moment from 'moment';
import React, {useState} from 'react';

import ColumnToggleDropdown from '@/core/common/presentation/components/column-toggle-dropdown';
import EmptyState from '@/core/common/presentation/components/empty-state';
import TableSkeleton from '@/core/common/presentation/components/loaders/table-skeleton';
import {Button} from '@/core/common/presentation/components/ui/button';
import {Card, CardContent} from '@/core/common/presentation/components/ui/card';
import {Input} from '@/core/common/presentation/components/ui/input';
import * as TableUI from '@/core/common/presentation/components/ui/table';
import {useAppStore} from '@/core/common/presentation/state/store';
import useGetAccounts from '@/features/accounts/presentation/state/hooks/use-get-accounts';
import useGetBanks from '@/features/bank/presentation/state/hooks/use-get-banks';
import useGetCategories from '@/features/category/presentation/state/hooks/use-get-categories';
import {TransactionModel} from '@/features/transactions/data/model/transaction.model';
import TransactionDateFilter from '@/features/transactions/presentation/components/transaction-date-filter';
import TransactionFilter from '@/features/transactions/presentation/components/transaction-filter';
import TransactionUpdate from '@/features/transactions/presentation/components/transaction-update';
import useGetTransactions from '@/features/transactions/presentation/state/hooks/use-get-transactions';

// destructure to ensure JSX identifiers exist in this module scope
const { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } =
  TableUI;

function TransactionTable() {
  const { transactions, user } = useAppStore();
  const {
    isGettingTransactions,
    handleUpdateQuery,
    page,
    limit,
    sortBy,
    orderBy,
    transactionType,
    categoryIds,
    accountIds,
    bankIds,
    search,
  } = useGetTransactions();
  const { isGettingBanks } = useGetBanks();
  const { isGettingAccounts } = useGetAccounts();
  const { isGettingCategories } = useGetCategories();

  const columns = [
      {key: 'transactionID', label: 'Transaction ID'},
    { key: 'description', label: 'Description' },
    { key: 'amount', label: `Amount (${user?.preferredCurrency || 'USD'})` },
    { key: 'type', label: 'Type' },
    { key: 'category', label: 'Category' },
    { key: 'account', label: 'Account' },
    { key: 'bank', label: 'Bank' },
    { key: 'transactionDate', label: 'Transaction Date' },
    { key: 'actions', label: 'Actions' },
  ];

  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map(col => col.key)
  );

  const toggleColumn = (columnKey: string) => {
    setVisibleColumns(prev =>
      prev.includes(columnKey)
        ? prev.filter((key: string) => key !== columnKey)
        : [...prev, columnKey]
    );
  };

  // toggle sort for given field (field should be 'amount' or 'date')
  const toggleSort = (field: 'amount' | 'date') => {
    // if different field, start with asc
    if (sortBy !== field) {
      handleUpdateQuery('sortBy', field);
      handleUpdateQuery('orderBy', 'asc');
      return;
    }

    // same field: cycle asc -> desc -> null
    if (orderBy === 'asc') {
      handleUpdateQuery('orderBy', 'desc');
      return;
    }

    if (orderBy === 'desc') {
      handleUpdateQuery('sortBy', undefined);
      handleUpdateQuery('orderBy', undefined);
      return;
    }

    // fallback to asc
    handleUpdateQuery('orderBy', 'asc');
  };

  const handleHeaderKeyDown = (
    e: React.KeyboardEvent,
    field: 'amount' | 'date'
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleSort(field);
    }
  };

  if (
    isGettingTransactions ||
    isGettingBanks ||
    isGettingAccounts ||
    isGettingCategories
  ) {
    return <TableSkeleton rows={5} columns={visibleColumns.length} />;
  }

  const currentPage = page;
  const perPage = limit;
  const total = transactions?.total ?? 0;
  const totalPages = perPage > 0 ? Math.max(1, Math.ceil(total / perPage)) : 1;
  const start = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const end = Math.min(total, start + (transactions?.data?.length ?? 0) - 1);

  const goToPrevious = () => {
    if (currentPage > 1) handleUpdateQuery('page', currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) handleUpdateQuery('page', currentPage + 1);
  };

  return (
    <div className="space-y-4">
        {transactions?.data?.length === 0 ? (
            <Card>
                <CardContent className="flex items-center justify-center h-64">
                    <EmptyState
                        title="No Transactions"
                        description="No transactions to display at the moment"
                        icon={Receipt}
                    />
                </CardContent>
            </Card>
        ) : (
            <>
                <div className="flex items-center justify-between">
                    <Input
                        type="search"
                        placeholder="Search transactions"
                        value={search ?? ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleUpdateQuery('search', e.target.value)
                        }
                        className="w-56 md:w-96 mr-2"
                        aria-label="Search transactions"
                    />
                    <div className="flex items-center">
                        <TransactionDateFilter/>
                        <TransactionFilter
                            handleUpdateQuery={handleUpdateQuery}
                            transactionType={transactionType}
                            categoryIds={categoryIds}
                            accountIds={accountIds}
                            bankIds={bankIds}
                        />

                        <ColumnToggleDropdown
                            columns={columns}
                            visibleColumns={visibleColumns}
                            onToggleColumn={toggleColumn}
                        />
                    </div>
                </div>
                <TableUI.Table className="border border-border">
                    <TableUI.TableHeader className="bg-primary">
                        <TableUI.TableRow>
                            {columns
                                .filter(col => visibleColumns.includes(col.key))
                                .map(col => {
                                    const isAmount = col.key === 'amount';
                                    const isDate = col.key === 'transactionDate';

                                    // render sortable header for amount and transactionDate
                                    if (isAmount || isDate) {
                                        const field: 'amount' | 'date' = isAmount ? 'amount' : 'date';
                                        const active = sortBy === field;
                                        const direction = active ? orderBy : undefined;

                                        return (
                                            <TableUI.TableHead
                                                key={col.key}
                                                className="border-r border-border last:border-r-0"
                                            >
                                                <div
                                                    role="button"
                                                    tabIndex={0}
                                                    onClick={() => toggleSort(field)}
                                                    onKeyDown={e => handleHeaderKeyDown(e, field)}
                                                    className="flex items-center cursor-pointer select-none text-white text-center"
                                                    aria-pressed={active}
                                                    aria-label={`Sort by ${col.label}`}
                                                >
                                                    <span>{col.label}</span>
                                                    <span className="ml-2">
                              {active && direction === 'asc' ? (
                                  <ChevronUp className="h-4 w-4 text-white"/>
                              ) : active && direction === 'desc' ? (
                                  <ChevronDown className="h-4 w-4 text-white"/>
                              ) : (
                                  <ChevronsUpDown className="h-4 w-4 text-white"/>
                              )}
                            </span>
                                                </div>
                                            </TableUI.TableHead>
                                        );
                                    }

                                    return (
                                        <TableUI.TableHead
                                            key={col.key}
                                            className="border-r border-border last:border-r-0 text-white text-center"
                                        >
                                            {col.label}
                                        </TableUI.TableHead>
                                    );
                                })}
                        </TableUI.TableRow>
                    </TableUI.TableHeader>
                    <TableUI.TableBody>
                        {transactions?.data?.map(transaction => (
                            <TableUI.TableRow
                                key={transaction.id}
                                className="border-b-2 border-border"
                            >
                                {visibleColumns.includes('transactionID') && (
                                    <TableUI.TableCell className="border-r border-border last-border-r-0">
                                        {transaction.transactionId}
                                    </TableUI.TableCell>
                                )}
                                {visibleColumns.includes('description') && (
                                    <TableUI.TableCell className="border-r border-border last-border-r-0">
                                        {transaction.description.substring(0, 50)}
                                    </TableUI.TableCell>
                                )}
                                {visibleColumns.includes('amount') && (
                                    <TableUI.TableCell className="border-r border-border last-border-r-0 text-center">
                                        {transaction.amount.toLocaleString('en-US')}
                                    </TableUI.TableCell>
                                )}
                                {visibleColumns.includes('type') && (
                                    <TableUI.TableCell className="border-r border-border last-border-r-0">
                      <span
                          className={`px-2 py-1 rounded-full text-xs ${transaction.type === 'credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                      >
                          {transaction.type}
                        </span>
                                    </TableUI.TableCell>
                                )}
                                {visibleColumns.includes('category') && (
                                    <TableUI.TableCell className="border-r border-border last-border-r-0">
                                        {transaction.category}
                                    </TableUI.TableCell>
                                )}
                                {visibleColumns.includes('account') && (
                                    <TableUI.TableCell className="border-r border-border last-border-r-0">
                                        {transaction.account}
                                    </TableUI.TableCell>
                                )}
                                {visibleColumns.includes('bank') && (
                                    <TableUI.TableCell className="border-r border-border last-border-r-0">
                                        {transaction.bank}
                                    </TableUI.TableCell>
                                )}
                                {visibleColumns.includes('transactionDate') && (
                                    <TableUI.TableCell className="border-r border-border last-border-r-0 text-center">
                                        {moment(transaction.transactionDate).format('DD/MM/YYYY')}
                                    </TableUI.TableCell>
                                )}
                                {visibleColumns.includes('actions') && (
                                    <TableUI.TableCell className="border-r border-border last-border-r-0">
                                        <TransactionUpdate
                                            transaction={transaction as unknown as TransactionModel}
                                        />
                                    </TableUI.TableCell>
                                )}
                            </TableUI.TableRow>
                        ))}
                    </TableUI.TableBody>
                </TableUI.Table>

                {/* Pagination controls */}
                <div className="flex items-center justify-between mt-2">
                    <div className="text-xs lg:text-sm text-muted-foreground">
                        {total === 0
                            ? 'No transactions'
                            : `Showing ${start} - ${end} of ${total}`}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={goToPrevious}
                            disabled={currentPage <= 1 || total === 0}
                        >
                            Prev
                        </Button>

                        {/* Page buttons with ellipsis */}
                        <div className="flex items-center space-x-1">
                            {(() => {
                                const pageItems: (number | string)[] = [];
                                const delta = 2; // show up to 2 pages before and after current
                                const left = Math.max(1, currentPage - delta);
                                const right = Math.min(totalPages, currentPage + delta);

                                if (left > 1) {
                                    pageItems.push(1);
                                    if (left > 2) pageItems.push('...');
                                }

                                for (let p = left; p <= right; p++) pageItems.push(p);

                                if (right < totalPages) {
                                    if (right < totalPages - 1) pageItems.push('...');
                                    pageItems.push(totalPages);
                                }

                                return pageItems.map((p, idx) =>
                                        typeof p === 'number' ? (
                                            <button
                                                key={p}
                                                onClick={() => handleUpdateQuery('page', p)}
                                                disabled={p === currentPage}
                                                className={`px-3 py-1 rounded text-sm border ${
                                                    p === currentPage
                                                        ? 'bg-primary text-white border-foreground'
                                                        : 'bg-background text-foreground border-border'
                                                }`}
                                            >
                                                {p}
                                            </button>
                                        ) : (
                                            <span key={`dot-${idx}`} className="px-2 text-sm">
                        {p}
                      </span>
                                        )
                                );
                            })()}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={goToNext}
                            disabled={currentPage >= totalPages || total === 0}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </>
        )}
    </div>
  );
}

export default TransactionTable;
